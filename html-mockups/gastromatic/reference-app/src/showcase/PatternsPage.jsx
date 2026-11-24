import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Badge,
  Button,
  Calendar,
  ChatContainer,
  ChatInput,
  ChatMessage,
  ClockTimeField,
  DatePicker,
  Drawer,
  FilterBar,
  ListCard,
  ListTable,
  Menu,
  Modal,
  Select,
  Stack,
  Table,
  Text,
  Textfield,
  dismissToast,
  showToast,
  toastSuccess,
} from "@gastromatic/components";
import { AreaChart, BarChart, PieChart } from "@gastromatic/components/chart";
import { ClockTime } from "@gastromatic/clock-time-date";
import {
  Calendar as CalendarIcon,
  CirclePlusDuoTone,
  Copy,
  Group as GroupIcon,
  Pen,
  People,
  Search,
  Settings,
  Shift,
  Tag,
  Trash,
} from "@gastromatic/icons";
import {
  AREAS,
  EMPLOYEES,
  HOURS_PER_AREA,
  HOURS_PER_DAY,
  REVENUE_PER_WEEK,
  SHIFTS,
  STATUSES,
} from "./data.js";
import { Caption, Column, FieldGrid, Page, Row, Section } from "./layout.jsx";

// Modal and drawer are sized to fill their columns of the 1440px wide page.
const MODAL_WIDTH = 372;
const DRAWER_WIDTH = 300;
const CHART_HEIGHT = 140;
// The library charts are at least 200px wide, so the first column gives each chart 200px.
const CHART_WIDTH = 200;

// The drawer fills whatever height the frame has, so the frame needs a height of its own.
const DrawerFrame = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1 0 400px;
  width: 100%;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, ${CHART_WIDTH}px);
  justify-content: space-between;
  width: 100%;
`;

const ChartCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const SearchSlot = styled.div`
  flex: none;
  width: 190px;
`;

const FILTER_GROUPS = [
  {
    id: "area",
    label: "Bereich",
    icon: <GroupIcon />,
    options: AREAS.map((area) => ({ value: area, label: area })),
  },
  {
    id: "status",
    label: "Status",
    icon: <Tag />,
    options: STATUSES.map((status) => ({ value: status, label: status })),
  },
];

const REVENUE_CONFIG = {
  plan: { label: "Plan", color: "var(--neutral-700)" },
  actual: { label: "Ist", color: "var(--primary-500)" },
};

function compareBy(key, order) {
  const direction = order === "desc" ? -1 : 1;

  return (a, b) => {
    if (typeof a[key] === "number") {
      return (a[key] - b[key]) * direction;
    }

    return String(a[key]).localeCompare(String(b[key]), "de") * direction;
  };
}

function EmployeeTableSection() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ area: ["Service", "Küche"] });
  const [sorting, setSorting] = useState({ key: "name", order: "asc" });

  const visibleEmployees = EMPLOYEES.filter((employee) => {
    const matchesQuery = employee.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesArea =
      !filters.area?.length || filters.area.includes(employee.area);
    const matchesStatus =
      !filters.status?.length || filters.status.includes(employee.status);

    return matchesQuery && matchesArea && matchesStatus;
  });

  const sortedEmployees = sorting
    ? [...visibleEmployees].sort(compareBy(sorting.key, sorting.order))
    : visibleEmployees;

  const columns = [
    {
      title: "Mitarbeiter",
      dataIndex: "person",
      key: "person",
      sortingKey: "name",
    },
    {
      title: "Bereich",
      dataIndex: "area",
      key: "area",
      sortingKey: "area",
      width: 110,
    },
    {
      title: "Std. / Woche",
      dataIndex: "hours",
      key: "hours",
      sortingKey: "hours",
      width: 120,
    },
    { title: "Status", dataIndex: "status", key: "status", width: 120 },
    { title: "", dataIndex: "actions", key: "actions", width: 72 },
  ];

  const dataSource = sortedEmployees.map((employee) => ({
    key: employee.id,
    person: (
      <Row wrap={false}>
        <Avatar name={employee.name} size={24} />
        <Text size={14}>{employee.name}</Text>
      </Row>
    ),
    area: employee.area,
    hours: employee.hours,
    status: <Badge variant={employee.variant}>{employee.status}</Badge>,
    actions: (
      <Row wrap={false} gap={4}>
        <Button
          size={24}
          prefix={<Pen />}
          aria-label={`${employee.name} bearbeiten`}
          onClick={() => toastSuccess(`${employee.name}: Bearbeiten gewählt.`)}
        />
        <Button
          size={24}
          prefix={<Copy />}
          aria-label={`${employee.name} kopieren`}
          onClick={() => toastSuccess(`${employee.name}: Kopieren gewählt.`)}
        />
      </Row>
    ),
  }));

  return (
    <Section id="table" title="Table · FilterBar · Werkzeugleiste">
      <Row justify="space-between" wrap={false} gap={12}>
        <Row wrap={false} gap={12} width="auto">
          <SearchSlot>
            <Textfield
              aria-label="Mitarbeiter suchen"
              type="search"
              prefix={<Search />}
              placeholder="Mitarbeiter suchen"
              size={28}
              width="100%"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              clearable
              onClear={() => setQuery("")}
            />
          </SearchSlot>
          <FilterBar
            groups={FILTER_GROUPS}
            value={filters}
            onChange={setFilters}
          />
        </Row>
        <Button size={28} variant="primary" prefix={<CirclePlusDuoTone />}>
          Anlegen
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={dataSource}
        fullWidth
        sortingConfig={{ currentSorting: sorting, onSortingChange: setSorting }}
        emptyState={{
          title: "Keine Mitarbeiter gefunden",
          description: "Filter anpassen oder Suche leeren.",
        }}
      />
    </Section>
  );
}

function ShiftListSection() {
  const [selectedKeys, setSelectedKeys] = useState(["mid"]);

  const columns = [
    {
      title: "Schicht",
      key: "name",
      flex: 1,
      render: (shift) => (
        <Text size={14} fontWeight={500}>
          {shift.name}
        </Text>
      ),
    },
    {
      title: "Bereich",
      key: "area",
      width: 90,
      render: (shift) => <Text size={14}>{shift.area}</Text>,
    },
    {
      title: "Zeit",
      key: "time",
      width: 120,
      render: (shift) => <Text size={14}>{shift.time}</Text>,
    },
    {
      title: "Besetzt",
      key: "staffed",
      width: 70,
      render: (shift) => <Text size={14}>{shift.staffed}</Text>,
    },
  ];

  return (
    <Section id="list-table" title="ListTable · Status, Auswahl, Zeilenmenü">
      <ListTable
        columns={columns}
        dataSource={SHIFTS}
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionActions={[
          {
            label: "Veröffentlichen",
            variant: "primary",
            onClick: () => toastSuccess("Schichten veröffentlicht."),
          },
          {
            label: "Löschen",
            variant: "danger",
            icon: <Trash />,
            onClick: () => toastSuccess("Löschen gewählt."),
          },
        ]}
        rowActions={() => [
          { label: "Bearbeiten", icon: <Pen /> },
          { label: "Duplizieren", icon: <Copy /> },
          { label: "Löschen", icon: <Trash />, variant: "danger" },
        ]}
        pagination={false}
        itemPadding={[8, 12, 8, 12]}
        animateRows={false}
      />
    </Section>
  );
}

function ChartsSection() {
  return (
    <Section id="charts" title="BarChart · AreaChart · PieChart" grow>
      <ChartGrid>
        <ChartCell>
          <Caption>Stunden pro Tag</Caption>
          <BarChart
            data={HOURS_PER_DAY}
            visibleItems={7}
            barGap={6}
            barBorderRadius={6}
            height={CHART_HEIGHT}
            width={CHART_WIDTH}
            showNavigation={false}
            animateOnMount={false}
          />
        </ChartCell>
        <ChartCell>
          <Caption>Umsatz pro KW in Tsd. €</Caption>
          <AreaChart
            data={REVENUE_PER_WEEK}
            config={REVENUE_CONFIG}
            xKey="week"
            seriesKeys={["plan", "actual"]}
            height={CHART_HEIGHT}
            width="100%"
            minWidth="none"
            showLegend
            animateOnMount={false}
          />
        </ChartCell>
        <ChartCell>
          <Caption>Stunden pro Bereich</Caption>
          <PieChart
            data={HOURS_PER_AREA}
            height={CHART_HEIGHT}
            innerRadius={24}
            showLegend
            animateOnMount={false}
          />
        </ChartCell>
      </ChartGrid>
    </Section>
  );
}

function ModalSection() {
  const [area, setArea] = useState("Service");

  return (
    <Section id="modal" title="Modal · Formular mit Fußzeile">
      <Modal
        isOpen
        withBackdrop={false}
        onClose={() => toastSuccess("Schließen gewählt.")}
        title="Schicht anlegen"
        width={MODAL_WIDTH}
        footer={
          <Row justify="flex-end" wrap={false}>
            <Button onClick={() => toastSuccess("Abbrechen gewählt.")}>
              Abbrechen
            </Button>
            <Button
              variant="primary"
              onClick={() => toastSuccess("Schicht angelegt.")}
            >
              Schicht anlegen
            </Button>
          </Row>
        }
      >
        <Stack gap={12}>
          <Select
            label="Bereich"
            required
            value={area}
            onChange={setArea}
            width="100%"
            options={AREAS.map((option) => ({ value: option, label: option }))}
          />
          <FieldGrid>
            <DatePicker
              label="Datum"
              required
              defaultValue={new Date(2026, 10, 14)}
              width="100%"
            />
            <ClockTimeField
              mode="range"
              label="Zeit"
              required
              defaultValue={{
                from: new ClockTime(17, 0, 0),
                to: new ClockTime(23, 30, 0),
              }}
              width="100%"
            />
          </FieldGrid>
        </Stack>
      </Modal>
    </Section>
  );
}

function ListCardSection() {
  return (
    <Section id="list-card" title="ListCard · Gruppe mit Zeilen">
      <ListCard.Group title="Standort Berlin Mitte">
        <ListCard
          prefix={<People />}
          content="Mitarbeiter"
          value="23"
          showArrow
          onClick={() => {}}
        />
        <ListCard
          prefix={<Shift />}
          content="Schichtvorlagen"
          value="8"
          showArrow
          active
          onClick={() => {}}
        />
        <ListCard
          prefix={<CalendarIcon />}
          content="Offene Urlaubsanträge"
          value="3"
          variant="warning"
          showArrow
          onClick={() => {}}
        />
      </ListCard.Group>
    </Section>
  );
}

function MenuAndAccordionSection() {
  const [view, setView] = useState("week");

  return (
    <Section id="menu" title="Menu · Accordion" gap={8} grow>
      <FieldGrid>
        <Menu>
          <Menu.Group label="Ansicht">
            <Menu.Item
              icon={<CalendarIcon />}
              selected={view === "week"}
              onClick={() => setView("week")}
            >
              Woche
            </Menu.Item>
            <Menu.Item
              icon={<People />}
              selected={view === "team"}
              onClick={() => setView("team")}
            >
              Team
            </Menu.Item>
            <Menu.Item icon={<Settings />} disabled>
              Vorlagen
            </Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Item icon={<Trash />} variant="danger">
            Plan löschen
          </Menu.Item>
        </Menu>
        <Accordion type="single" collapsible defaultValue="rest">
          <AccordionItem value="rest" trigger="Ruhezeiten">
            <Text size={14} color="neutral-800">
              Mindestens 11 Stunden zwischen zwei Schichten.
            </Text>
          </AccordionItem>
          <AccordionItem value="breaks" trigger="Pausen">
            <Text size={14} color="neutral-800">
              30 Minuten ab 6 Stunden Arbeitszeit.
            </Text>
          </AccordionItem>
          <AccordionItem value="surcharges" trigger="Zuschläge">
            <Text size={14} color="neutral-800">
              25 % nach 20 Uhr, 50 % an Sonntagen.
            </Text>
          </AccordionItem>
        </Accordion>
      </FieldGrid>
    </Section>
  );
}

function AssistantDrawerSection() {
  const [draft, setDraft] = useState("");

  return (
    <Section id="drawer" title="Drawer · Chat" grow>
      <DrawerFrame>
        <Drawer
          isOpen
          inline
          inlineGap={0}
          width={DRAWER_WIDTH}
          onClose={() => toastSuccess("Schließen gewählt.")}
          title="Assistent"
          fillContentHeight
          footer={
            <ChatInput
              size={36}
              value={draft}
              onChange={setDraft}
              onSend={() => setDraft("")}
              placeholder="Frage zum Dienstplan"
              showVoiceInput={false}
            />
          }
        >
          <ChatContainer height="100%">
            <ChatContainer.Content gap={12}>
              <ChatContainer.Message animate={false}>
                <ChatMessage
                  variant="user"
                  message="Wer kann am Samstag die Spätschicht übernehmen?"
                />
              </ChatContainer.Message>
              <ChatContainer.Message animate={false}>
                <ChatMessage
                  variant="assistant"
                  assistantName="Assistent"
                  message="**Carla Weber** und **David Koch** sind frei und haben die Qualifikation Bar."
                  suggestions={[
                    {
                      id: "carla",
                      label: "Carla einplanen",
                      onClick: () => toastSuccess("Carla eingeplant."),
                    },
                    {
                      id: "david",
                      label: "David einplanen",
                      onClick: () => toastSuccess("David eingeplant."),
                    },
                  ]}
                />
              </ChatContainer.Message>
            </ChatContainer.Content>
          </ChatContainer>
        </Drawer>
      </DrawerFrame>
    </Section>
  );
}

function CalendarSection() {
  const [range, setRange] = useState({
    from: new Date(2026, 10, 9),
    to: new Date(2026, 10, 15),
  });

  return (
    <Section id="calendar" title="Calendar · Zeitraum, markierte Tage">
      <Calendar
        size={28}
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date(2026, 10, 1)}
        showWeekNumber
        markedDates={[
          { date: new Date(2026, 10, 4), color: "warning-500" },
          { date: new Date(2026, 10, 20), color: "danger-500" },
          { date: new Date(2026, 10, 25) },
        ]}
      />
    </Section>
  );
}

/** Complex and combined components, on one 1440×900 viewport. */
export default function PatternsPage() {
  useEffect(() => {
    // Stays open so that the screenshot shows what a toast looks like.
    const toastId = showToast({
      variant: "primary",
      headline: "Dienstplan veröffentlicht",
      message: "",
      position: "top-center",
      duration: Infinity,
    });

    return () => dismissToast(toastId);
  }, []);

  return (
    <Page
      page="patterns"
      title="Zusammengesetzte Komponenten"
      columns="648fr 396fr 324fr"
    >
      <Column>
        <EmployeeTableSection />
        <ShiftListSection />
        <ChartsSection />
      </Column>
      <Column>
        <ModalSection />
        <ListCardSection />
        <MenuAndAccordionSection />
      </Column>
      <Column>
        <AssistantDrawerSection />
        <CalendarSection />
      </Column>
    </Page>
  );
}

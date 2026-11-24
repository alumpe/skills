import { useState } from "react";
import styled from "styled-components";
import {
  Action,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Close,
  ConfirmModal,
  DatePicker,
  Divider,
  EditableText,
  Headline,
  Loading,
  Menu,
  Numberfield,
  Popover,
  RadioGroup,
  SegmentedButton,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Table,
  Text,
  Textarea,
  Textfield,
  ToastProvider,
  Toggle,
  ToggleButton,
  Tooltip,
  TooltipProvider,
  toastError,
  toastSuccess,
} from "@gastromatic/components";
import {
  Account,
  Calendar,
  CirclePlusDuoTone,
  Copy,
  Trash,
} from "@gastromatic/icons";

const Screen = styled.div`
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  background: var(--neutral-50);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;

  @media (max-height: 840px) {
    padding: 4px 20px;
  }
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 16px;
  min-height: 0;
  padding: 0 24px;

  @media (max-height: 840px) {
    gap: 12px;
    padding: 0 20px;
  }
`;

const Section = styled.section`
  min-width: 0;
  min-height: 0;
  grid-column: span ${({ $wide }) => ($wide ? 2 : 1)};
`;

const SectionContent = styled(Stack)`
  height: 100%;

  @media (max-height: 840px) {
    gap: 8px;

    section[aria-labelledby="form"] & {
      gap: 0;
    }
  }
`;

const GroupContent = styled(Stack)`
  @media (max-height: 840px) {
    gap: 4px;
  }
`;

const GroupTitle = styled.h3`
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--neutral-700);
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 10px 24px 12px;

  @media (max-height: 840px) {
    padding: 4px 20px;
  }
`;

const TableArea = styled.div`
  width: 100%;
  min-width: 0;
`;

const periodOptions = [
  { value: "day", label: "Tag" },
  { value: "week", label: "Woche" },
  { value: "month", label: "Monat" },
];

const employees = [
  {
    name: "Anna Müller",
    role: "Service",
    hours: 38,
    status: "Eingeplant",
    variant: "primary",
  },
  {
    name: "Ben Schmidt",
    role: "Küche",
    hours: 24,
    status: "Urlaub",
    variant: "warning",
  },
  {
    name: "Carla Weber",
    role: "Service",
    hours: 32,
    status: "Eingeplant",
    variant: "primary",
  },
];

function Row({ children, ...props }) {
  return (
    <Stack direction="row" align="center" gap={8} wrap {...props}>
      {children}
    </Stack>
  );
}

function Group({ title, children }) {
  return (
    <GroupContent gap={8}>
      <GroupTitle>{title}</GroupTitle>
      {children}
    </GroupContent>
  );
}

function DemoSection({
  id,
  title,
  description,
  number,
  wide,
  gap = 12,
  children,
}) {
  return (
    <Section aria-labelledby={id} $wide={wide}>
      <Card layer={1} padding={16} height="100%">
        <SectionContent gap={gap}>
          <Row justify="space-between" wrap={false}>
            <Stack gap={4}>
              <Headline id={id} level={2} visualLevel={5}>
                {title}
              </Headline>
              <Text size={12} color="neutral-700">
                {description}
              </Text>
            </Stack>
            <Text size={12} color="neutral-700">
              {number}
            </Text>
          </Row>
          {children}
        </SectionContent>
      </Card>
    </Section>
  );
}

function ButtonsDemo() {
  const [chipVisible, setChipVisible] = useState(true);

  return (
    <DemoSection
      id="buttons"
      number="01"
      title="Buttons & Status"
      description="Aktionen, Größen und Kennzeichnungen"
    >
      <Group title="Buttons · Varianten">
        <Row>
          {[
            ["primary", "Primär"],
            ["neutral", "Neutral"],
            ["secondary", "Sekundär"],
            ["danger", "Gefahr"],
            ["warning", "Warnung"],
            ["ai", "KI"],
          ].map(([variant, label]) => (
            <Button
              key={variant}
              variant={variant}
              size={28}
              onClick={() => toastSuccess(`${label}-Button geklickt.`)}
            >
              {label}
            </Button>
          ))}
        </Row>
      </Group>
      <Group title="Größen & Icon-Aktionen">
        <Row>
          {[24, 28, 36, 40, 44].map((size) => (
            <Button
              key={size}
              size={size}
              onClick={() => toastSuccess(`Button-Größe: ${size} px`)}
            >
              {size}
            </Button>
          ))}
          <Tooltip
            trigger={
              <Action
                aria-label="Kopieren"
                icon={<Copy />}
                onClick={() => toastSuccess("Kopieren-Aktion ausgelöst.")}
              />
            }
          >
            Kopieren
          </Tooltip>
          <Tooltip
            trigger={
              <Action
                aria-label="Entfernen"
                icon={<Trash />}
                variant="danger"
                onClick={() => toastError("Entfernen-Aktion ausgelöst.")}
              />
            }
          >
            Entfernen
          </Tooltip>
          <Close
            aria-label="Schließen-Beispiel"
            onClick={() => toastSuccess("Schließen-Aktion ausgelöst.")}
          />
        </Row>
      </Group>
      <Group title="Zustände & Button mit Icon">
        <Row>
          <Button size={28} loading>
            Lädt…
          </Button>
          <Button size={28} disabled>
            Deaktiviert
          </Button>
          <Button
            size={28}
            variant="primary"
            prefix={<CirclePlusDuoTone />}
            onClick={() => toastSuccess("Eintrag hinzugefügt (Demo).")}
          >
            Hinzufügen
          </Button>
        </Row>
      </Group>
      <Divider />
      <Group title="Badges">
        <Row>
          <Badge variant="primary">Aktiv</Badge>
          <Badge variant="neutral">Entwurf</Badge>
          <Badge variant="warning">Ausstehend</Badge>
          <Badge variant="danger">Fehler</Badge>
          <Badge variant="ai">KI</Badge>
        </Row>
      </Group>
      <Group title="Chips · Filter & Entfernen">
        <Row>
          <Chip>Küche</Chip>
          <Chip>Service</Chip>
          {chipVisible ? (
            <Chip onClose={() => setChipVisible(false)}>Entfernbar</Chip>
          ) : (
            <Button size={24} onClick={() => setChipVisible(true)}>
              Wiederherstellen
            </Button>
          )}
        </Row>
      </Group>
    </DemoSection>
  );
}

function FormDemo() {
  const [name, setName] = useState("Anna Müller");
  const [location, setLocation] = useState("berlin");
  const [hours, setHours] = useState("38");
  const [email, setEmail] = useState("anna@");

  const emailError = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ? undefined
    : "E-Mail unvollständig.";

  return (
    <DemoSection
      id="form"
      number="02"
      title="Eingabefelder"
      description="Ein kleines Formular mit Validierung"
      gap={8}
    >
      <FieldGrid>
        <Textfield
          id="employee-name"
          aria-label="Name"
          label="Name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          clearable
          onClear={() => setName("")}
          width="100%"
        />
        <Textfield
          id="employee-number"
          aria-label="Personalnummer"
          label="Personalnummer"
          value="MA-0042"
          disabled
          width="100%"
        />
      </FieldGrid>
      <FieldGrid>
        <Select
          aria-label="Standort"
          label="Standort"
          value={location}
          onChange={setLocation}
          searchable
          width="100%"
          options={[
            { value: "berlin", label: "Berlin" },
            { value: "hamburg", label: "Hamburg" },
            { value: "muenchen", label: "München" },
          ]}
        />
        <Numberfield
          id="weekly-hours"
          aria-label="Wochenstunden"
          label="Wochenstunden"
          value={hours}
          onChange={(event) => setHours(event.target.value)}
          min={0}
          max={48}
          suffix="h"
          showButtons
          width="100%"
        />
      </FieldGrid>
      <FieldGrid>
        <DatePicker
          label="Startdatum"
          placeholder="Datum wählen"
          width="100%"
        />
        <Textfield
          id="employee-email"
          aria-label="E-Mail"
          label="E-Mail · Validierung"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailError}
          width="100%"
        />
      </FieldGrid>
      <Textarea
        id="employee-note"
        aria-label="Notiz"
        label="Notiz"
        placeholder="Platz für eine kurze Notiz…"
        size={28}
        rows={2}
        resizable={false}
        width="100%"
      />
    </DemoSection>
  );
}

function SelectionDemo() {
  const [checked, setChecked] = useState(true);
  const [leave, setLeave] = useState(false);
  const [partial, setPartial] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [compact, setCompact] = useState(false);
  const [plan, setPlan] = useState("pro");
  const [period, setPeriod] = useState("week");
  const [channels, setChannels] = useState(["email"]);
  const [capacity, setCapacity] = useState(65);

  return (
    <DemoSection
      id="selection"
      number="03"
      title="Auswahl & Steuerung"
      description="Einfach-, Mehrfachauswahl und Einstellungen"
    >
      <Group title="Checkboxes">
        <Row>
          <Checkbox
            label="Dienste"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
          <Checkbox
            label="Urlaub"
            checked={leave}
            onChange={(event) => setLeave(event.target.checked)}
          />
          <Checkbox
            label="Teilweise"
            indeterminate={partial}
            checked={!partial}
            onChange={() => setPartial(!partial)}
          />
          <Checkbox label="Gesperrt" disabled />
        </Row>
      </Group>
      <Group title="RadioGroup · Eine Option">
        <RadioGroup
          name="plan"
          direction="horizontal"
          value={plan}
          onChange={setPlan}
          options={[
            { value: "basic", label: "Basic" },
            { value: "pro", label: "Pro" },
            { value: "enterprise", label: "Enterprise", disabled: true },
          ]}
        />
      </Group>
      <Group title="Toggles">
        <Row gap={16}>
          <Toggle
            label="Mitteilungen"
            checked={notifications}
            onChange={(event) => setNotifications(event.target.checked)}
          />
          <Toggle
            label="Kompakt"
            checked={compact}
            onChange={(event) => setCompact(event.target.checked)}
          />
          <Toggle aria-label="Deaktivierter Toggle" disabled />
        </Row>
      </Group>
      <Divider />
      <Group title="SegmentedButton & Mehrfachauswahl">
        <Row gap={12}>
          <SegmentedButton
            size={28}
            value={period}
            onChange={setPeriod}
            options={periodOptions}
          />
          <ToggleButton
            size={28}
            value={channels}
            onChange={setChannels}
            options={[
              { value: "email", label: "E-Mail" },
              { value: "phone", label: "Telefon" },
            ]}
          />
        </Row>
      </Group>
      <Group title="Slider · Kapazität">
        <Slider
          aria-label="Kapazität"
          value={capacity}
          onChange={setCapacity}
          min={0}
          max={100}
        />
      </Group>
    </DemoSection>
  );
}

function InlineEditDemo() {
  const [value, setValue] = useState("Frühschicht Service");

  return <EditableText value={value} onChange={setValue} />;
}

function FeedbackDemo() {
  const [open, setOpen] = useState(false);

  return (
    <DemoSection
      id="feedback"
      number="04"
      title="Feedback & Overlays"
      description="Rückmeldungen, Ladezustände und Dialoge"
    >
      <Group title="Alerts">
        <FieldGrid>
          <Alert variant="primary" message="Gespeichert." />
          <Alert variant="warning" message="2 Schichten offen." />
        </FieldGrid>
      </Group>
      <Group title="Skeleton · Spinner · Loading">
        <Row gap={16} wrap={false}>
          <Stack gap={8} flex="1">
            <Skeleton width="100%" height="10px" />
            <Skeleton width="65%" height="10px" />
          </Stack>
          <Spinner size={24} />
          <Loading variant="expressive" size={32} />
        </Row>
      </Group>
      <Group title="Toasts, Tooltip, Popover & Modal">
        <Row>
          <Button
            size={28}
            onClick={() =>
              toastSuccess("Alles hat geklappt!", { headline: "Gespeichert" })
            }
          >
            Erfolgs-Toast
          </Button>
          <Button
            size={28}
            onClick={() =>
              toastError("Bitte erneut versuchen.", { headline: "Fehler" })
            }
          >
            Fehler-Toast
          </Button>
        </Row>
        <Row>
          <Tooltip trigger={<Button size={28}>Tooltip</Button>}>
            Ein kurzer Hilfetext.
          </Tooltip>
          <Popover trigger={<Button size={28}>Popover</Button>}>
            <Stack gap={12} width="220px">
              <Text fontWeight={600}>Zusätzliche Informationen</Text>
              <Text size={14}>
                Popovers zeigen Details, ohne die aktuelle Ansicht zu verlassen.
              </Text>
            </Stack>
          </Popover>
          <Button size={28} variant="danger" onClick={() => setOpen(true)}>
            Dialog öffnen
          </Button>
        </Row>
      </Group>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Eintrag entfernen?"
        content="Dies ist ein Beispieldialog. Es werden keine echten Daten gelöscht."
        buttons={[
          {
            children: "Entfernen",
            variant: "danger",
            onClick: () => {
              setOpen(false);

              toastSuccess("Beispiel bestätigt.");
            },
          },
          {
            children: "Abbrechen",
            variant: "neutral",
            onClick: () => setOpen(false),
          },
        ]}
      />
    </DemoSection>
  );
}

function TableDemo() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(query.toLowerCase()) &&
      (department === "all" || employee.role === department),
  );

  const columns = [
    { title: "Mitarbeiter", dataIndex: "person", key: "person" },
    { title: "Bereich", dataIndex: "role", key: "role" },
    { title: "Std. / Woche", dataIndex: "hours", key: "hours", width: 110 },
    { title: "Status", dataIndex: "status", key: "status", width: 130 },
    { title: "Aktion", dataIndex: "action", key: "action", width: 70 },
  ];

  const dataSource = filteredEmployees.map((employee) => ({
    key: employee.name,
    person: (
      <Row wrap={false}>
        <Avatar name={employee.name} size={24} />
        <Text size={14}>{employee.name}</Text>
      </Row>
    ),
    role: employee.role,
    hours: employee.hours,
    status: <Badge variant={employee.variant}>{employee.status}</Badge>,
    action: (
      <Action
        aria-label={`${employee.name} kopieren`}
        icon={<Copy />}
        onClick={() =>
          toastSuccess(`${employee.name}: Kopieren-Aktion ausgelöst.`)
        }
      />
    ),
  }));

  return (
    <DemoSection
      id="table"
      number="05"
      title="Tabelle & zusammengesetzte Komponenten"
      description="Table mit Avatars, Badges, Suchfeld und Aktionen"
      wide
    >
      <Row justify="space-between" wrap={false} gap={16}>
        <Textfield
          aria-label="Mitarbeiter suchen"
          type="search"
          placeholder="Mitarbeiter suchen…"
          size={28}
          width="250px"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          clearable
          onClear={() => setQuery("")}
        />
        <Row width="auto" wrap={false}>
          <Text size={12} color="neutral-700">
            {filteredEmployees.length} von {employees.length} Personen
          </Text>
          <Popover
            trigger={
              <Button size={28} prefix={<Account />}>
                Bereich: {department === "all" ? "Alle" : department}
              </Button>
            }
          >
            <Menu width="210px">
              <Menu.Group label="Menu · Bereich filtern">
                {[
                  ["all", "Alle Bereiche"],
                  ["Service", "Service"],
                  ["Küche", "Küche"],
                  ["Verwaltung", "Verwaltung"],
                ].map(([value, label]) => (
                  <Menu.Item
                    key={value}
                    selected={department === value}
                    onClick={() => setDepartment(value)}
                  >
                    {label}
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu>
          </Popover>
        </Row>
      </Row>
      <TableArea>
        <Table columns={columns} dataSource={dataSource} fullWidth />
        {dataSource.length === 0 && (
          <Stack padding={16}>
            <Text size={14}>Keine passenden Mitarbeiter gefunden.</Text>
          </Stack>
        )}
      </TableArea>
      <Row justify="space-between">
        <Row width="auto" wrap={false}>
          <Text size={12} color="neutral-700">
            EditableText
          </Text>
          <InlineEditDemo />
        </Row>
        <Row width="auto">
          <Calendar size={16} />
          <Text size={12} color="neutral-700">
            Beispieldaten · Personalplanung
          </Text>
        </Row>
      </Row>
    </DemoSection>
  );
}

/** Single-viewport, interactive examples using the Gastromatic component library. */
export default function Showcase() {
  return (
    <>
      <ToastProvider position="top-right" />
      <TooltipProvider>
        <Screen>
          <Header>
            <Stack gap={4} width="auto">
              <Text size={12} fontWeight={600} color="neutral-700">
                gastromatic / Design System
              </Text>
              <Headline level={1} visualLevel={3}>
                Komponentenübersicht
              </Headline>
            </Stack>
            <Row width="auto" gap={12}>
              <Text size={12} color="neutral-700">
                Echte Komponenten. Direkt ausprobieren.
              </Text>
              <Badge variant="primary">Light Theme</Badge>
              <Avatar name="Adrian Weber" size={32} />
            </Row>
          </Header>
          <Main>
            <ButtonsDemo />
            <FormDemo />
            <SelectionDemo />
            <FeedbackDemo />
            <TableDemo />
          </Main>
          <Footer>
            <Text size={12} color="neutral-700">
              @gastromatic/components
            </Text>
            <Text size={12} color="neutral-700">
              Grundbausteine → zusammengesetzte Beispiele
            </Text>
          </Footer>
        </Screen>
      </TooltipProvider>
    </>
  );
}

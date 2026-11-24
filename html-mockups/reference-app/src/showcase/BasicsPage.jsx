import { useState } from "react";
import styled from "styled-components";
import {
  Action,
  Alert,
  AnimatedNumber,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  ClockTimeField,
  Close,
  ColorPicker,
  DatePicker,
  Divider,
  EditableText,
  Handle,
  Headline,
  Loading,
  Numberfield,
  Paragraph,
  Progress,
  RadioGroup,
  SegmentedButton,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Text,
  Textarea,
  Textfield,
  Toggle,
  ToggleButton,
  TooltipSurface,
  TreeSelect,
  Upload,
  toastSuccess,
} from "@gastromatic/components";
import { ClockTime } from "@gastromatic/clock-time-date";
import {
  CirclePlusDuoTone,
  Copy,
  Down,
  Pen,
  Search,
  Shift,
  Sparkle,
  Trash,
} from "@gastromatic/icons";
import { Caption, Column, FieldGrid, Page, Row, Section } from "./layout.jsx";

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 24px;
  align-items: start;
  width: 100%;
`;

const CARD_SAMPLE_PADDING = [4, 8, 4, 8];

const BUTTON_VARIANTS = [
  ["primary", "Primär"],
  ["neutral", "Neutral"],
  ["white", "Weiß"],
  ["secondary", "Sekundär"],
  ["danger", "Gefahr"],
  ["warning", "Warnung"],
  ["ai", "KI"],
];

const CARD_VARIANTS = ["primary", "warning", "danger", "ai"];

const LOCATIONS = [
  { value: "berlin", label: "Berlin Mitte" },
  { value: "hamburg", label: "Hamburg Altona" },
  { value: "muenchen", label: "München Schwabing" },
];

const SKILLS = [
  { value: "bar", label: "Bar" },
  { value: "kasse", label: "Kasse" },
  { value: "grill", label: "Grill" },
  { value: "ersthelfer", label: "Ersthelfer" },
];

const AREA_GROUPS = [
  {
    id: "area",
    label: "Bereich",
    defaultValue: ["service"],
    options: [
      { value: "service", label: "Service" },
      { value: "kitchen", label: "Küche" },
      { value: "bar", label: "Bar" },
    ],
  },
  {
    id: "contract",
    label: "Vertragsart",
    defaultValue: ["fulltime"],
    options: [
      { value: "fulltime", label: "Vollzeit" },
      { value: "parttime", label: "Teilzeit" },
      { value: "minijob", label: "Minijob" },
    ],
  },
];

function TypeAndSurfaceSection() {
  return (
    <Section id="type" title="Headline · Text · Card · Divider">
      <TypeGrid>
        <Stack gap={2}>
          <Headline level={3} visualLevel={2}>
            Headline 2
          </Headline>
          <Headline level={3} visualLevel={3}>
            Headline 3
          </Headline>
          <Headline level={3} visualLevel={4}>
            Headline 4
          </Headline>
          <Headline level={3} visualLevel={5}>
            Headline 5
          </Headline>
        </Stack>
        <Stack gap={4}>
          <Text size={16}>Text 16 · Fließtext</Text>
          <Text size={14}>Text 14 · Tabellenzellen und Menüs</Text>
          <Text size={14} fontWeight={500}>
            Text 14 / 500 · Labels und Buttons
          </Text>
          <Text size={12} color="neutral-800">
            Text 12 · Hilfetexte und Metadaten
          </Text>
          <Paragraph size={14}>Paragraph 14 · Absätze</Paragraph>
        </Stack>
      </TypeGrid>
      <Stack gap={8}>
        <FieldGrid $columns={6} $gap={8}>
          {[0, 1, 2, 3, 4, "glass"].map((layer) => (
            <Card
              key={layer}
              layer={layer}
              padding={CARD_SAMPLE_PADDING}
              borderRadius={12}
            >
              <Text size={12}>
                {layer === "glass" ? "Glass" : `Layer ${layer}`}
              </Text>
            </Card>
          ))}
        </FieldGrid>
        <FieldGrid $columns={4} $gap={8}>
          {CARD_VARIANTS.map((variant) => (
            <Card
              key={variant}
              variant={variant}
              padding={CARD_SAMPLE_PADDING}
              borderRadius={12}
            >
              <Text size={12}>{variant}</Text>
            </Card>
          ))}
          <Card
            variant="primary"
            expressive
            padding={CARD_SAMPLE_PADDING}
            borderRadius={12}
          >
            <Text size={12} color="text-white">
              expressive
            </Text>
          </Card>
          <Card type="dashed" padding={CARD_SAMPLE_PADDING} borderRadius={12}>
            <Text size={12}>dashed</Text>
          </Card>
          <Card active padding={CARD_SAMPLE_PADDING} borderRadius={12}>
            <Text size={12}>active</Text>
          </Card>
          <Card
            clickable
            padding={CARD_SAMPLE_PADDING}
            borderRadius={12}
            onClick={() => toastSuccess("Card geklickt.")}
          >
            <Text size={12}>clickable</Text>
          </Card>
        </FieldGrid>
      </Stack>
      <FieldGrid $columns={3}>
        <Divider />
        <Divider variant="dashed" />
        <Divider title="oder" />
      </FieldGrid>
    </Section>
  );
}

function ButtonsSection() {
  return (
    <Section id="buttons" title="Button · Action · Close · Handle · Tooltip">
      <Row gap={6}>
        {BUTTON_VARIANTS.map(([variant, label]) => (
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
      <Row>
        <Caption>Größe</Caption>
        {[24, 28, 36, 40, 44].map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
        <TooltipSurface>Tooltip</TooltipSurface>
      </Row>
      <Row gap={6}>
        <Button size={28} variant="primary" prefix={<CirclePlusDuoTone />}>
          Neu
        </Button>
        <Button size={28} prefix={<Pen />} aria-label="Bearbeiten" />
        <Button size={28} suffix={<Down />}>
          Mehr
        </Button>
        <Button size={28} loading>
          Lädt
        </Button>
        <Button size={28} disabled>
          Deaktiviert
        </Button>
        <Button size={28} variant="primary" disabled>
          Deaktiviert
        </Button>
      </Row>
      <Row gap={12}>
        <Action aria-label="Kopieren" icon={<Copy />} />
        <Action aria-label="Bearbeiten" icon={<Pen />} variant="neutral" />
        <Action aria-label="Entfernen" icon={<Trash />} variant="danger" />
        <Action icon={<CirclePlusDuoTone />} variant="primary">
          Schicht
        </Action>
        <Action icon={<Sparkle />} variant="ai">
          Vorschlag
        </Action>
        <Close aria-label="Schließen" />
        <Handle />
      </Row>
    </Section>
  );
}

function StatusSection() {
  const [chipVisible, setChipVisible] = useState(true);

  return (
    <Section id="status" title="Badge · Chip · Avatar" grow>
      <Row gap={6}>
        <Badge variant="neutral">Entwurf</Badge>
        <Badge variant="primary">Aktiv</Badge>
        <Badge variant="warning">Ausstehend</Badge>
        <Badge variant="danger">Abgelehnt</Badge>
        <Badge variant="ai">KI</Badge>
        <Badge variant="white">Weiß</Badge>
        <Badge variant="primary" icon={<Shift />}>
          Frühschicht
        </Badge>
      </Row>
      <Row gap={6}>
        <Badge variant="primary" expressive>
          Bezahlt
        </Badge>
        <Badge variant="warning" expressive>
          Offen
        </Badge>
        <Badge variant="danger" expressive>
          3
        </Badge>
        <Badge variant="ai" expressive>
          KI
        </Badge>
        <Caption>Größe</Caption>
        <Badge size={12}>12</Badge>
        <Badge size={16}>16</Badge>
        <Badge size={20}>20</Badge>
      </Row>
      <Row gap={6}>
        <Chip size={24}>Küche</Chip>
        <Chip>Service</Chip>
        <Chip prefix={<Shift />}>Spätschicht</Chip>
        <Chip clickable>Klickbar</Chip>
        {chipVisible ? (
          <Chip onClose={() => setChipVisible(false)}>Entfernbar</Chip>
        ) : (
          <Button size={24} onClick={() => setChipVisible(true)}>
            Wiederherstellen
          </Button>
        )}
      </Row>
      <Row>
        <Avatar name="Anna Müller" size={24} />
        <Avatar name="Ben Schmidt" size={32} />
        <Avatar name="Carla Weber" size={40} />
        <Avatar name="David Koch" size={48} />
        <Avatar name="Elif Yıldız" size={32} color="primary" />
        <Avatar name="Finn Bauer" size={32} color="secondary" />
        <Avatar name="Greta Lang" size={32} color="purple" />
        <Avatar name="Hanna Wolf" size={32} eMail />
        <Avatar
          name="Ivo Brandt"
          size={32}
          highlight="ai"
          highlightAnimated={false}
        />
      </Row>
    </Section>
  );
}

function InputsSection() {
  const [name, setName] = useState("Anna Müller");
  const [location, setLocation] = useState("berlin");
  const [skills, setSkills] = useState(["bar", "kasse"]);
  const [hours, setHours] = useState("38");
  const [email, setEmail] = useState("anna@");
  const [color, setColor] = useState("#49D6B7");
  const [shiftName, setShiftName] = useState("Frühschicht Service");

  const emailError = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ? undefined
    : "E-Mail unvollständig.";

  return (
    <Section
      id="inputs"
      title="Textfield · Select · Numberfield · DatePicker"
      grow
    >
      <FieldGrid>
        <Textfield
          id="employee-name"
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
          label="Personalnummer"
          value="MA-0042"
          disabled
          width="100%"
        />
        <Select
          label="Standort"
          required
          value={location}
          onChange={setLocation}
          searchable
          width="100%"
          options={LOCATIONS}
        />
        <Select
          label="Qualifikationen"
          multiple
          value={skills}
          onChange={setSkills}
          width="100%"
          options={SKILLS}
        />
        <Numberfield
          id="weekly-hours"
          label="Wochenstunden"
          required
          value={hours}
          onChange={(event) => setHours(event.target.value)}
          min={0}
          max={48}
          suffix="h"
          showButtons
          width="100%"
        />
        <Textfield
          id="hourly-wage"
          label="Stundenlohn"
          required
          value="14,50"
          suffix="€"
          helperText="Brutto, ohne Zuschläge."
          width="100%"
        />
        <DatePicker
          label="Startdatum"
          required
          defaultValue={new Date(2026, 10, 2)}
          placeholder="Datum wählen"
          width="100%"
        />
        <ClockTimeField
          mode="range"
          label="Zeit (ClockTimeField)"
          required
          defaultValue={{
            from: new ClockTime(6, 0, 0),
            to: new ClockTime(14, 30, 0),
          }}
          width="100%"
        />
        <Textfield
          id="employee-email"
          label="E-Mail"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailError}
          width="100%"
        />
        <Textfield
          id="employee-phone"
          label="Telefon"
          type="tel"
          variant="warning"
          value="030 1234"
          helperText="Vorwahl prüfen."
          width="100%"
        />
        <TreeSelect
          label="Filter (TreeSelect)"
          groups={AREA_GROUPS}
          placeholder="Bereich oder Vertragsart"
          width="100%"
        />
        <Textfield
          id="employee-search"
          label="Suche"
          type="search"
          prefix={<Search />}
          placeholder="Mitarbeiter suchen"
          width="100%"
        />
        <Upload
          label="Vertrag (Upload)"
          required={false}
          accept=".pdf"
          placeholder="PDF hierher ziehen oder klicken"
          width="100%"
        />
        <Stack gap={8}>
          <Textarea
            id="employee-note"
            label="Notiz (Textarea)"
            placeholder="Kurze Notiz zur Schicht"
            rows={2}
            resizable={false}
            width="100%"
          />
          <Row gap={12}>
            <Caption>ColorPicker</Caption>
            <ColorPicker value={color} onChange={setColor} size={28} />
          </Row>
          <Row gap={12}>
            <Caption>EditableText</Caption>
            <EditableText value={shiftName} onChange={setShiftName} />
          </Row>
        </Stack>
      </FieldGrid>
      <Row wrap={false} align="end">
        <Caption>Größe</Caption>
        {[24, 28, 36, 40, 44].map((size) => (
          <Textfield
            key={size}
            aria-label={`Größe ${size}`}
            size={size}
            value={String(size)}
            width="100%"
          />
        ))}
      </Row>
    </Section>
  );
}

function SelectionSection() {
  const [shifts, setShifts] = useState(true);
  const [leave, setLeave] = useState(false);
  const [partial, setPartial] = useState(true);
  const [payOvertime, setPayOvertime] = useState(true);
  const [plan, setPlan] = useState("pro");
  const [notifications, setNotifications] = useState(true);
  const [compact, setCompact] = useState(false);
  const [period, setPeriod] = useState("week");
  const [channels, setChannels] = useState(["email"]);
  const [capacity, setCapacity] = useState(65);

  return (
    <Section
      id="selection"
      title="Checkbox · Radio · Toggle · Segmented · Slider"
    >
      <Row gap={12}>
        <Checkbox
          label="Dienste"
          checked={shifts}
          onChange={(event) => setShifts(event.target.checked)}
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
      <Checkbox
        label="Überstunden auszahlen"
        description="Gilt ab dem nächsten Abrechnungsmonat."
        checked={payOvertime}
        onChange={(event) => setPayOvertime(event.target.checked)}
      />
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
      <Row gap={16}>
        <Toggle
          label="Mitteilungen"
          checked={notifications}
          onChange={(event) => setNotifications(event.target.checked)}
        />
        <Toggle
          size={24}
          label="Kompakt"
          checked={compact}
          onChange={(event) => setCompact(event.target.checked)}
        />
        <Toggle
          size={24}
          variant="warning"
          aria-label="Warnung"
          checked
          onChange={() => {}}
        />
        <Toggle size={24} aria-label="Deaktiviert" disabled />
      </Row>
      <Row gap={12}>
        <SegmentedButton
          size={28}
          value={period}
          onChange={setPeriod}
          options={[
            { value: "day", label: "Tag" },
            { value: "week", label: "Woche" },
            { value: "month", label: "Monat" },
          ]}
        />
        <ToggleButton
          size={28}
          value={channels}
          onChange={setChannels}
          options={[
            { value: "email", label: "E-Mail" },
            { value: "phone", label: "Telefon" },
            { value: "app", label: "App" },
          ]}
        />
      </Row>
      <Slider
        aria-label="Kapazität"
        value={capacity}
        onChange={setCapacity}
        min={0}
        max={100}
      />
    </Section>
  );
}

function FeedbackSection() {
  const [revenue, setRevenue] = useState(12840);

  return (
    <Section
      id="feedback"
      title="Alert · Progress · Skeleton · Spinner · Loading"
      grow
    >
      <FieldGrid $gap={8}>
        <Alert variant="default" message="Noch ein Entwurf." />
        <Alert variant="primary" message="Gespeichert." />
        <Alert variant="warning" message="2 Schichten offen." />
        <Alert variant="danger" message="Export fehlerhaft." />
        <Alert variant="ai" message="3 Vorschläge." />
        <Alert variant="expressive" message="Update verfügbar." />
      </FieldGrid>
      <Alert
        variant="warning"
        headline="Ruhezeit unterschritten"
        message="Ben Schmidt hat nur 9 Stunden Pause."
        actions={[
          {
            label: "Schicht ändern",
            onClick: () => toastSuccess("Schicht ändern gewählt."),
          },
          {
            label: "Ignorieren",
            variant: "neutral",
            onClick: () => toastSuccess("Hinweis ignoriert."),
          },
        ]}
        onClose={() => toastSuccess("Hinweis geschlossen.")}
      />
      <Row gap={16} wrap={false}>
        <Stack gap={10} flex="1">
          <Progress value={72} label="Besetzte Schichten" />
          <Progress
            size={8}
            max={28}
            label="Verplanter Urlaub"
            segments={[
              { value: 14, color: "primary-700" },
              { value: 4, color: "primary-500" },
              { value: 3, color: "primary-300" },
            ]}
          />
          <Progress type="steps" value={2} max={4} label="Einrichtung" />
        </Stack>
        <Progress
          type="circle"
          value={72}
          size={56}
          thickness={6}
          label="Besetzte Schichten"
        >
          <Text size={12} fontWeight={600}>
            72 %
          </Text>
        </Progress>
      </Row>
      <Row gap={16} wrap={false}>
        <Stack gap={6} flex="1">
          <Skeleton width="100%" height="10px" />
          <Skeleton width="65%" height="10px" />
        </Stack>
        <Spinner size={24} />
        <Loading variant="expressive" size={32} />
        <Button size={28} onClick={() => setRevenue(revenue + 315)}>
          <span>
            <AnimatedNumber value={revenue} /> €
          </span>
        </Button>
      </Row>
    </Section>
  );
}

/** Basic components and their variants, on one 1440×900 viewport. */
export default function BasicsPage() {
  return (
    <Page
      page="basics"
      title="Grundbausteine"
      columns="repeat(3, minmax(0, 1fr))"
    >
      <Column>
        <TypeAndSurfaceSection />
        <ButtonsSection />
        <StatusSection />
      </Column>
      <Column>
        <InputsSection />
      </Column>
      <Column>
        <SelectionSection />
        <FeedbackSection />
      </Column>
    </Page>
  );
}

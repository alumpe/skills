import styled from "styled-components";
import {
  Card,
  Headline,
  SegmentedButton,
  Stack,
  Text,
} from "@gastromatic/components";

const PAGES = [
  { value: "basics", label: "Grundbausteine" },
  { value: "patterns", label: "Zusammengesetzt" },
];

// Composed for a 1440×900 viewport. On a smaller one, or when a section needs more room,
// the page keeps its width and grows downwards, and the browser scrolls.
const Screen = styled.div`
  min-width: 1440px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  background: var(--neutral-50);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  padding: 0 24px;
`;

const Columns = styled.main`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  gap: 12px;
  padding: 0 24px 12px;
`;

/** One vertical stack of sections inside a page. */
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

const SectionBox = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: ${({ $grow }) => ($grow ? "1 0 auto" : "0 0 auto")};
`;

const SectionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

const SectionContent = styled(Stack)`
  flex: 1 0 auto;
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${({ $columns = 2 }) => $columns},
    minmax(0, 1fr)
  );
  gap: ${({ $gap = 12 }) => $gap}px;
  align-items: start;
  width: 100%;
`;

/** Full-viewport page frame with the title and the switch between the two pages. */
export function Page({ page, title, columns, children }) {
  return (
    <Screen>
      <Header>
        <Headline level={1} visualLevel={4}>
          {title}
        </Headline>
        <SegmentedButton
          size={28}
          value={page}
          onChange={(value) => {
            window.location.hash = `#/${value}`;
          }}
          options={PAGES}
        />
      </Header>
      <Columns $columns={columns}>{children}</Columns>
    </Screen>
  );
}

export function Section({ id, title, grow, gap = 10, padding = 12, children }) {
  return (
    <SectionBox aria-labelledby={id} $grow={grow}>
      <SectionCard layer={1} padding={padding}>
        <SectionContent gap={gap}>
          <Headline id={id} level={2} visualLevel={6}>
            {title}
          </Headline>
          {children}
        </SectionContent>
      </SectionCard>
    </SectionBox>
  );
}

/** Small inline label for a sample that does not name itself. */
export function Caption({ children }) {
  return (
    <Text size={12} color="neutral-700">
      {children}
    </Text>
  );
}

export function Row({ children, ...props }) {
  return (
    <Stack direction="row" align="center" gap={8} wrap {...props}>
      {children}
    </Stack>
  );
}

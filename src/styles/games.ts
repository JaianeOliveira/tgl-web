import styled from "styled-components";

export const RecentGameDiv = styled.div<{ color: string }>`
  border-left: 6px solid ${(props) => props.color};
`;

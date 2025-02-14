import React from "react";
import styled from "styled-components";
import Title from "./Title";

interface EmptyProps {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}

function Empty({ icon, title, description }: EmptyProps) {
  return (
    <EmptyStyle>
      {icon && <div className="icon">{icon}</div>}
      <Title size="large" color="secondary">
        {title}
      </Title>
      {description && <p>{description}</p>}
    </EmptyStyle>
  );
}

const EmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 120px 0;
  min-height: 60vh;
  width: 100%;
  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc;
    }
  }
`;

export default Empty;

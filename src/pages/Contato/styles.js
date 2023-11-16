import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: auto;
  gap: 0px;
`;

const ContatoContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
`;

const Nome = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const Endereco = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const Telefone = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

export const Title = styled.h2`
  margin-top: 20px
`;

import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled(AiOutlineLoading3Quarters)`
  animation: ${spin} 1s linear infinite;
  font-size: 32px;
  color: #007bff; /* Cor do spinner */
`;

export default Spinner;
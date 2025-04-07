// Página de servidor sin dependencia de tipos
import ClientComponent from './client';

export default function Page(props) {
  return <ClientComponent {...props} />;
} 
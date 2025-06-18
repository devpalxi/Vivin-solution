import { getClients } from "@/app/actions/clients";
import ClientLogos from "./client-logos";

export default async function ClientLogosServer() {
  const clients = await getClients();
  return <ClientLogos clients={clients} />;
}

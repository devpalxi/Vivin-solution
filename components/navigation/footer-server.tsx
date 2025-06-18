import { getServiceCategories } from "@/app/actions/services";
import Footer from "./footer";

export default async function FooterServer() {
  const serviceCategories = await getServiceCategories();
  return <Footer serviceCategories={serviceCategories} />;
}

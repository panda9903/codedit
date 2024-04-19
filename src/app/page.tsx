import Image from "next/image";
import { ProfileForm } from "./components/Form";
import { MacbookScroll } from "./components/Laptop";

export default function Home() {
  return (
    <div>
      <ProfileForm />
      <MacbookScroll />
    </div>
  );
}

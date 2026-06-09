import Link from "next/link";
import { MdCopyright } from "react-icons/md";
import { siteConfig } from "@/data/siteConfig";
import HomeSeoBlock from "./HomeSeoBlock";
import "./styles/HomeFooter.css";

export default function HomeFooter() {
  return (
    <footer className="home-footer section-container">
      <h2>
        Designed and Developed <br /> by <span>{siteConfig.name}</span>
      </h2>
      <p>
        <MdCopyright /> {siteConfig.year}
        {" · "}
        <Link href="/privacy">Privacy Policy</Link>
      </p>
      <HomeSeoBlock />
    </footer>
  );
}

import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function TopBar() {
  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 z-50 w-full text-xs text-white bg-blue-600 md:text-sm">
      <div className="flex flex-row items-center justify-between px-3 py-1 md:px-10 md:h-12">
        
        {/* Adresse + Téléphone */}
        <div className="flex items-center gap-4">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="flex items-center space-x-1 cursor-pointer">
                <MapPin size={14} />
                <span className="font-medium">{t("topbar.location")}</span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" sideOffset={5}
              className="z-[9999] px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
              {t("topbar.tooltip.location")}
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="flex items-center space-x-1 cursor-pointer">
                <Phone size={14} />
                <span className="font-medium">{t("topbar.phone")}</span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" sideOffset={5}
              className="z-[9999] px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
              {t("topbar.tooltip.phone")}
            </Tooltip.Content>
          </Tooltip.Root>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="flex items-center space-x-1 cursor-pointer">
                <Mail size={14} />
                <span className="font-medium">{t("topbar.email")}</span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" sideOffset={5}
              className="z-[9999] px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
              {t("topbar.tooltip.email")}
            </Tooltip.Content>
          </Tooltip.Root>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex items-center gap-3">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <FaFacebookF size={14} />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" sideOffset={5}
              className="z-[9999] px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
              {t("topbar.tooltip.facebook")}
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <FaLinkedinIn size={14} />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" sideOffset={5}
              className="z-[9999] px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
              {t("topbar.tooltip.linkedin")}
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
                <FaTwitter size={14} />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" sideOffset={5}
              className="z-[9999] px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
              {t("topbar.tooltip.twitter")}
            </Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
    </div>
  );
}

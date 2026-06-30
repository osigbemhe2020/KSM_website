import React, { ReactNode } from "react";
import placeholderImg from "@/assets/leader-1.jpg";

export interface ProfileCardProps {
  imageSrc?: string;
  roleNode?: ReactNode; // small text above name (e.g. role or location)
  name: string;
  subtitle?: ReactNode; // small text below name
  description?: string;
  buttonText?: string;
  buttonIcon?: ReactNode;
  onButtonClick?: () => void;
  testIdPrefix?: string;
  footerNode?: ReactNode; // custom element at the bottom (e.g. metrics)
}

export default function ProfileCard({
  imageSrc,
  roleNode,
  name,
  subtitle,
  description,
  buttonText,
  buttonIcon,
  onButtonClick,
  testIdPrefix,
  footerNode,
}: ProfileCardProps) {
  const imgSrc = imageSrc || placeholderImg.src;

  return (
    <article 
      data-testid={testIdPrefix ? `card-${testIdPrefix}` : undefined}
      className="border border-border bg-cream/60 p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-square bg-muted overflow-hidden mb-4 shrink-0">
        <img src={imgSrc} alt={name} loading="lazy" className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 flex flex-col">
        {roleNode && (
          <div className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
            {roleNode}
          </div>
        )}
        
        <h3 className="font-serif text-lg font-bold text-foreground leading-tight mb-1">
          {name}
        </h3>
        
        {subtitle && (
          <div className="text-[11px] tracking-wide text-muted-foreground mb-3">
            {subtitle}
          </div>
        )}
        
        {description && (
          <p className="text-xs text-foreground/70 leading-relaxed mb-4 flex-1">
            {description}
          </p>
        )}
        
        {footerNode && (
          <div className="mt-auto pt-2">
            {footerNode}
          </div>
        )}
        
        {buttonText && (
          <button 
            data-testid={testIdPrefix ? `button-view-profile-${testIdPrefix}` : undefined}
            onClick={onButtonClick}
            className="mt-auto self-start flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase px-3 py-2 border border-border hover:border-forest hover:text-forest transition-colors font-semibold"
          >
            {buttonText} {buttonIcon}
          </button>
        )}
      </div>
    </article>
  );
}

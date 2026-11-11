"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect } from "react";

import { SITE } from "@/src/shared/config/site-config";

export interface AppImageProps extends Omit<ImageProps, "onError" | "src"> {
  src?: ImageProps["src"] | null;
  fallbackVariant?: "light" | "white";
  fallbackClassName?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function LogoPlaceholder({
  variant = "light",
  className = "",
  fill = true,
  width,
  height,
}: {
  variant?: "light" | "white";
  className?: string;
  fill?: boolean;
  width?: number | `${number}`;
  height?: number | `${number}`;
}) {
  const isWhite = variant === "white";
  const logoSrc = isWhite ? "/Logo_white.png" : "/Logo.png";

  const containerClasses = [
    fill ? "absolute inset-0" : "relative inline-flex",
    "flex items-center justify-center overflow-hidden select-none",
    isWhite
      ? "bg-gradient-to-br from-[#1E232A] via-[#2A313C] to-[#1E232A]"
      : "bg-gradient-to-br from-slate-100 via-orange-50/30 to-slate-200/90",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyle =
    !fill && width && height
      ? { width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height }
      : undefined;

  return (
    <div className={containerClasses} style={inlineStyle} aria-hidden="true">
      <div className="relative flex flex-col items-center justify-center p-3 text-center transition-transform duration-300">
        <Image
          src={logoSrc}
          alt={SITE.brand.name}
          width={140}
          height={48}
          className="max-h-16 w-auto max-w-[70%] object-contain opacity-75 transition-opacity hover:opacity-90"
          priority={false}
          unoptimized
        />
      </div>
    </div>
  );
}

export function AppImage({
  src,
  alt,
  fallbackVariant = "light",
  fallbackClassName = "",
  className,
  fill,
  width,
  height,
  onError,
  ...rest
}: AppImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state whenever the image source changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || (typeof src === "string" && !src.trim()) || hasError) {
    return (
      <LogoPlaceholder
        variant={fallbackVariant}
        className={fallbackClassName || className}
        fill={fill}
        width={width}
        height={height}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt || SITE.brand.name}
      className={className}
      fill={fill}
      width={width}
      height={height}
      onError={(event) => {
        setHasError(true);
        onError?.(event);
      }}
      {...rest}
    />
  );
}

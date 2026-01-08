"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  triggerRef?: React.RefObject<HTMLElement>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  triggerRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        onClose();
      }
    };

    // Close this dropdown when another dropdown opens
    const handleDropdownOpened = (event: CustomEvent) => {
      if (isOpen && event.detail !== triggerRef?.current) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("dropdown-opened", handleDropdownOpened as EventListener);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("dropdown-opened", handleDropdownOpened as EventListener);
    };
  }, [onClose, isOpen, triggerRef]);

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const updatePosition = () => {
        if (triggerRef?.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          setPosition({
            top: rect.bottom + 8, // 8px = mt-2 equivalent
            right: window.innerWidth - rect.right,
          });
        }
      };

      updatePosition();
      
      // Update position on scroll or resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setPosition(null);
    }
  }, [isOpen, triggerRef]);

  if (!isOpen || !position) return null;

  return (
    <div
      ref={dropdownRef}
      className={`fixed z-40 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
    >
      {children}
    </div>
  );
};

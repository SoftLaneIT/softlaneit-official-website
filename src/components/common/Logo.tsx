/*
 * Copyright (c) 2026, SoftlaneIT (https://softlaneit.com/) All Rights Reserved.
 *
 * SoftlaneIT licenses this file to you under the Apache License,
 * Version 2.0 (the "LICENSE"); you may not use this file except
 * in compliance with the LICENSE.
 * You may obtain a copy of the LICENSE at
 *
 * https://softlaneit.com/LICENSE.txt
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the LICENSE is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the LICENSE for the
 * specific language governing permissions and limitations
 * under the LICENSE.
 */

import logoWhite from '../../assets/images/logo-white.svg';
import logoDark from '../../assets/images/logo-dark.svg';
import { useTheme } from '../../context/ThemeContext';

export const Logo = ({ className = "", variant = "default", height = 40 }: { className?: string; variant?: "default" | "white" | "dark"; height?: number }) => {
  const { theme } = useTheme();

  let logoSrc;

  if (variant === 'default') {
    // In light mode, we want the dark logo (contrast).
    // In dark mode, we want the white logo.
    logoSrc = theme === 'light' ? logoDark : logoWhite;
  } else if (variant === 'dark') {
    logoSrc = logoDark;
  } else {
    logoSrc = logoWhite;
  }

  return (
    <img
      src={logoSrc}
      alt="Softlane IT"
      className={className}
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
};

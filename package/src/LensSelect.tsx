import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  factory,
  Factory,
  getBaseValue,
  getRadius,
  getThemeColor,
  StylesApiProps,
  useProps,
  useRandomClassName,
  useStyles,
  type MantineColor,
  type MantineRadius,
  type StyleProp,
} from '@mantine/core';
import { useMergedRef, useUncontrolled } from '@mantine/hooks';
import { LensSelectProvider, type LensSelectOrientation } from './LensSelect.context';
import { LensSelectIndicator, type LensSelectIndicatorProps } from './LensSelectIndicator';
import { LensSelectMediaVariables } from './LensSelectMediaVariables';
import classes from './LensSelect.module.css';

export interface LensSelectItem {
  /** Unique value identifying this item */
  value: string | number;

  /** Content rendered inside the item. When omitted, a default pill (rounded rectangle) is rendered. */
  view?: React.ReactNode;
}

export type LensSelectVariant = 'default' | 'outline';

export type LensSelectStylesNames =
  | 'root'
  | 'track'
  | 'item'
  | 'itemContent'
  | 'itemPill'
  | 'indicator';

export type LensSelectCssVariables = {
  root:
    | '--ls-transition-duration'
    | '--ls-item-size'
    | '--ls-magnification'
    | '--ls-range'
    | '--ls-gap'
    | '--ls-pill-height'
    | '--ls-pill-width'
    | '--ls-pill-radius'
    | '--ls-pill-color'
    | '--ls-pill-color-hover'
    | '--ls-pill-color-active';
};

export interface LensSelectBaseProps {
  /** Array of items to display */
  data?: LensSelectItem[];

  /** Controlled selected value */
  value?: string | number;

  /** Uncontrolled initial value */
  defaultValue?: string | number;

  /** Called when the selected value changes */
  onChange?: (value: string | number) => void;

  /** Orientation of the items layout, `'horizontal'` by default */
  orientation?: LensSelectOrientation;

  /** Maximum magnification factor, `2` by default (200%) */
  magnification?: number;

  /** Number of adjacent items influenced by the lens effect, `3` by default */
  lensRange?: number;

  /** Enable scale effect on hover, `true` by default */
  withScale?: boolean;

  /** Enable opacity effect on hover, `false` by default */
  withOpacity?: boolean;

  /** Enable blur effect on hover, `false` by default */
  withBlur?: boolean;

  /** Min and max opacity range, `[0.4, 1]` by default */
  opacityRange?: [number, number];

  /** Min and max blur range in px, `[0, 3]` by default */
  blurRange?: [number, number];

  /** Base size of each item in px, `24` by default. Supports responsive values. */
  itemSize?: StyleProp<number | string>;

  /** Gap between items, `10` by default. Supports responsive values. */
  gap?: StyleProp<number | string>;

  /** When true, items push neighbors apart during magnification (macOS Dock style), `false` by default */
  expandOnHover?: boolean;

  /** How items are selected: `'click'` (default) requires a click, `'hover'` auto-selects on hover */
  selectionMode?: 'click' | 'hover';

  /** Enable mouse wheel navigation, `false` by default. When active in hover mode, hover only applies the visual effect — selection is driven by the wheel. */
  withWheel?: boolean;

  /** Enable wrap-around navigation, `false` by default */
  loop?: boolean;

  /** Transition duration in ms, `200` by default */
  transitionDuration?: number;

  /** Custom render function for each item */
  renderItem?: (
    item: LensSelectItem,
    options: { active: boolean; scale: number; hovered: boolean }
  ) => React.ReactNode;

  /** Show selection indicator below/beside the active item, `false` by default */
  withIndicator?: boolean;

  /** Height of the default pill, `'100%'` by default. Supports responsive values. */
  pillHeight?: StyleProp<number | string>;

  /** Width (thickness) of the default pill in px, `4` by default. Supports responsive values. */
  pillWidth?: StyleProp<number>;

  /** Border radius of the default pill, `'xl'` by default */
  pillRadius?: MantineRadius;

  /** Color of the default pill (inactive state), uses `dimmed` by default */
  pillColor?: MantineColor;

  /** Color of the pill when hovered (not selected), uses theme primary light by default */
  hoverColor?: MantineColor;

  /** Color of the active pill and indicator, uses theme primary by default */
  activeColor?: MantineColor;

  /** Props passed to the built-in LensSelect.Indicator when `withIndicator` is true */
  indicatorProps?: LensSelectIndicatorProps;

  /** Accessible label for the component */
  ariaLabel?: string;

  /** Children (e.g. LensSelect.Indicator) */
  children?: React.ReactNode;
}

export interface LensSelectProps
  extends BoxProps, LensSelectBaseProps, StylesApiProps<LensSelectFactory> {}

export type LensSelectFactory = Factory<{
  props: LensSelectProps;
  ref: HTMLDivElement;
  stylesNames: LensSelectStylesNames;
  variant: LensSelectVariant;
  vars: LensSelectCssVariables;
  staticComponents: {
    Indicator: typeof LensSelectIndicator;
  };
}>;

const defaultProps: Partial<LensSelectProps> = {
  variant: 'default',
  orientation: 'horizontal',
  magnification: 2,
  lensRange: 3,
  withScale: true,
  withOpacity: false,
  withBlur: false,
  opacityRange: [0.4, 1],
  blurRange: [0, 3],
  itemSize: 24,
  gap: 10,
  expandOnHover: false,
  selectionMode: 'click',
  withWheel: false,
  loop: false,
  transitionDuration: 200,
  withIndicator: true,
  pillHeight: '100%',
  pillWidth: 4,
  pillRadius: 'xl',
  ariaLabel: 'Lens select',
};

const varsResolver = createVarsResolver<LensSelectFactory>(
  (
    theme,
    { transitionDuration, magnification, lensRange, pillRadius, pillColor, hoverColor, activeColor }
  ) => ({
    root: {
      '--ls-transition-duration': `${transitionDuration}ms`,
      '--ls-magnification': String(magnification),
      '--ls-range': String(lensRange),
      '--ls-pill-radius': pillRadius !== undefined ? getRadius(pillRadius) : undefined,
      '--ls-pill-color': pillColor ? getThemeColor(pillColor, theme) : undefined,
      '--ls-pill-color-hover': hoverColor ? getThemeColor(hoverColor, theme) : undefined,
      '--ls-pill-color-active': activeColor ? getThemeColor(activeColor, theme) : undefined,
      // Responsive vars (itemSize, gap, pillHeight, pillWidth)
      // are handled by LensSelectMediaVariables
      '--ls-item-size': undefined as unknown as string,
      '--ls-gap': undefined as unknown as string,
      '--ls-pill-height': undefined as unknown as string,
      '--ls-pill-width': undefined as unknown as string,
    },
  })
);

/**
 * Compute a magnification factor using a cosine-based easing.
 * Returns 0 when distance >= maxRange, 1 when distance === 0.
 */
function computeLensFactor(distance: number, maxRange: number): number {
  if (maxRange <= 0 || distance >= maxRange) {
    return 0;
  }
  if (distance <= 0) {
    return 1;
  }
  // Cosine easing: smooth bell-curve falloff
  return (1 + Math.cos((Math.PI * distance) / maxRange)) / 2;
}

export const LensSelect = factory<LensSelectFactory>((_props, ref) => {
  const props = useProps('LensSelect', defaultProps, _props);
  const {
    data,
    value,
    defaultValue,
    onChange,
    orientation,
    magnification,
    lensRange,
    withScale,
    withOpacity,
    withBlur,
    opacityRange,
    blurRange,
    itemSize,
    gap,
    expandOnHover,
    selectionMode,
    withWheel,
    loop,
    transitionDuration,
    renderItem,
    withIndicator,
    pillHeight: _pillHeight,
    pillWidth: _pillWidth,
    pillRadius: _pillRadius,
    pillColor: _pillColor,
    hoverColor: _hoverColor,
    activeColor: _activeColor,
    indicatorProps,
    ariaLabel,
    children,
    variant,
    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,
    mod,
    ...others
  } = props;

  const items = data || [];

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue: defaultValue ?? items[0]?.value,
    finalValue: items[0]?.value,
    onChange,
  });

  const getStyles = useStyles<LensSelectFactory>({
    name: 'LensSelect',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const responsiveClassName = useRandomClassName();

  const internalTrackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mergedRootRef = useMergedRef(ref, rootRef);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scaleFactors, setScaleFactors] = useState<number[]>(() => items.map(() => 0));
  const [isHovering, setIsHovering] = useState(false);

  const activeIndex = useMemo(
    () => items.findIndex((item) => item.value === _value),
    [items, _value]
  );

  // Resolve item size in px for distance calculations
  const baseItemSize = getBaseValue(itemSize) as number | string;
  const itemSizePx = typeof baseItemSize === 'number' ? baseItemSize : 24;
  const maxRange = (lensRange ?? 3) * itemSizePx;

  const isHoverMode = selectionMode === 'hover';
  const autoSelectOnHover = isHoverMode && !withWheel;

  // Compute scale factors centered on a specific item index (for wheel mode)
  const computeIndexBasedFactors = useCallback(
    (centerIndex: number) =>
      items.map((_item, i) => {
        const distance = Math.abs(i - centerIndex) * itemSizePx;
        return computeLensFactor(distance, maxRange);
      }),
    [items, itemSizePx, maxRange]
  );

  // Compute scale factors based on cursor position (for hover/click mode)
  const updateScaleFactorsFromCursor = useCallback(
    (cursorPos: number) => {
      const track = internalTrackRef.current;
      if (!track) {
        return;
      }

      const newFactors = items.map((_item, i) => {
        const el = itemRefs.current[i];
        if (!el) {
          return 0;
        }

        const rect = el.getBoundingClientRect();
        const isHoriz = orientation === 'horizontal';
        const center = isHoriz ? rect.left + rect.width / 2 : rect.top + rect.height / 2;
        const distance = Math.abs(cursorPos - center);
        return computeLensFactor(distance, maxRange);
      });

      setScaleFactors(newFactors);

      // In hover mode without wheel, auto-select the item closest to cursor
      if (autoSelectOnHover) {
        let maxFactor = 0;
        let maxIndex = -1;
        newFactors.forEach((f, i) => {
          if (f > maxFactor) {
            maxFactor = f;
            maxIndex = i;
          }
        });
        if (maxIndex >= 0 && items[maxIndex].value !== _value) {
          handleChange(items[maxIndex].value);
        }
      }
    },
    [items, orientation, maxRange, autoSelectOnHover, _value, handleChange]
  );

  // In wheel mode: show genius effect on selected item when hovering
  const wheelHovering = isHoverMode && withWheel;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (wheelHovering) {
        // In hover+wheel: no cursor-based effect, just mark as hovering
        if (!isHovering) {
          setIsHovering(true);
          setScaleFactors(computeIndexBasedFactors(activeIndex));
        }
      } else {
        const pos = orientation === 'horizontal' ? e.clientX : e.clientY;
        updateScaleFactorsFromCursor(pos);
        if (!isHovering) {
          setIsHovering(true);
        }
      }
    },
    [
      wheelHovering,
      orientation,
      updateScaleFactorsFromCursor,
      isHovering,
      activeIndex,
      computeIndexBasedFactors,
    ]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (wheelHovering) {
        return;
      }
      const touch = e.touches[0];
      if (!touch) {
        return;
      }
      const pos = orientation === 'horizontal' ? touch.clientX : touch.clientY;
      updateScaleFactorsFromCursor(pos);
      if (!isHovering) {
        setIsHovering(true);
      }
    },
    [wheelHovering, orientation, updateScaleFactorsFromCursor, isHovering]
  );

  const handleMouseLeave = useCallback(() => {
    setScaleFactors(items.map(() => 0));
    setIsHovering(false);
  }, [items]);

  const navigateTo = useCallback(
    (index: number) => {
      let target = index;
      if (loop) {
        target = ((index % items.length) + items.length) % items.length;
      } else {
        target = Math.max(0, Math.min(items.length - 1, index));
      }
      if (items[target]) {
        handleChange(items[target].value);
      }
    },
    [items, loop, handleChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const isHoriz = orientation === 'horizontal';
      const prevKey = isHoriz ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = isHoriz ? 'ArrowRight' : 'ArrowDown';

      if (e.key === prevKey) {
        e.preventDefault();
        navigateTo(activeIndex - 1);
      } else if (e.key === nextKey) {
        e.preventDefault();
        navigateTo(activeIndex + 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateTo(items.length - 1);
      }
    },
    [orientation, activeIndex, navigateTo, items.length]
  );

  // Wheel navigation — same pattern as DepthSelect: simple deltaY + cooldown
  const navigateToRef = useRef(navigateTo);
  const activeIndexRef = useRef(activeIndex);
  const computeFactorsRef = useRef(computeIndexBasedFactors);
  const setScaleFactorsRef = useRef(setScaleFactors);
  navigateToRef.current = navigateTo;
  activeIndexRef.current = activeIndex;
  computeFactorsRef.current = computeIndexBasedFactors;
  setScaleFactorsRef.current = setScaleFactors;

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !withWheel) {
      return;
    }

    let cooldown = false;
    const duration = transitionDuration || 200;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (cooldown || Math.abs(event.deltaY) < 5) {
        return;
      }
      cooldown = true;
      const idx = activeIndexRef.current;
      const nextIdx = event.deltaY > 0 ? idx + 1 : idx - 1;
      navigateToRef.current(nextIdx);
      setScaleFactorsRef.current(computeFactorsRef.current(nextIdx));
      setTimeout(() => {
        cooldown = false;
      }, duration);
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      node.removeEventListener('wheel', handleWheel);
    };
  }, [withWheel, transitionDuration]);

  const getContentStyle = useCallback(
    (index: number): React.CSSProperties => {
      const factor = scaleFactors[index] ?? 0;
      const mag = magnification ?? 2;
      const styleObj: React.CSSProperties = {
        willChange: isHovering ? 'transform, opacity, filter' : 'auto',
      };

      if (withScale) {
        const scale = 1 + (mag - 1) * factor;
        styleObj.transform = `scale(${scale})`;
      }

      if (withOpacity) {
        const [minO, maxO] = opacityRange ?? [0.4, 1];
        styleObj.opacity = isHovering ? minO + (maxO - minO) * factor : 1;
      }

      if (withBlur) {
        const [minB, maxB] = blurRange ?? [0, 3];
        const blur = isHovering ? maxB - (maxB - minB) * factor : 0;
        styleObj.filter = `blur(${blur}px)`;
      }

      return styleObj;
    },
    [
      scaleFactors,
      magnification,
      withScale,
      withOpacity,
      withBlur,
      opacityRange,
      blurRange,
      isHovering,
    ]
  );

  const isPillMode = !renderItem && items.every((item) => item.view == null);

  const contextValue = useMemo(
    () => ({
      getStyles,
      items,
      activeValue: _value,
      orientation: orientation ?? 'horizontal',
      scaleFactors,
      isHovering,
      isPillMode,
      trackRef: internalTrackRef,
      itemRefs,
    }),
    [getStyles, items, _value, orientation, scaleFactors, isHovering, isPillMode, itemRefs]
  );

  return (
    <LensSelectProvider value={contextValue}>
      <LensSelectMediaVariables
        itemSize={itemSize}
        gap={gap}
        pillHeight={_pillHeight}
        pillWidth={_pillWidth}
        selector={`.${responsiveClassName}`}
      />
      <Box
        ref={mergedRootRef}
        {...getStyles('root', { className: responsiveClassName })}
        {...others}
        mod={[{ orientation }, mod]}
        data-variant={variant}
        role="listbox"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <Box
          ref={internalTrackRef}
          {...getStyles('track')}
          mod={{ orientation }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
        >
          {items.map((item, index) => {
            const isActive = item.value === _value;
            const factor = scaleFactors[index] ?? 0;
            const mag = magnification ?? 2;
            const extraSpace =
              expandOnHover && withScale ? (mag - 1) * factor * itemSizePx * 0.5 : 0;
            const isHoriz = orientation === 'horizontal';
            const itemStyle: React.CSSProperties =
              extraSpace > 0
                ? isHoriz
                  ? { marginLeft: extraSpace, marginRight: extraSpace }
                  : { marginTop: extraSpace, marginBottom: extraSpace }
                : {};

            return (
              <Box
                key={item.value}
                ref={(el: HTMLDivElement | null) => {
                  itemRefs.current[index] = el;
                }}
                {...getStyles('item')}
                style={itemStyle}
                role="option"
                aria-selected={isActive}
                data-active={isActive || undefined}
                data-pill={item.view == null && !renderItem ? true : undefined}
                data-index={index}
                onClick={selectionMode === 'click' ? () => handleChange(item.value) : undefined}
              >
                <Box {...getStyles('itemContent')} style={getContentStyle(index)}>
                  {renderItem
                    ? renderItem(item, {
                        active: isActive,
                        scale: withScale ? 1 + ((magnification ?? 2) - 1) * factor : 1,
                        hovered: factor > 0,
                      })
                    : (item.view ?? (
                        <Box
                          {...getStyles('itemPill')}
                          data-active={isActive || undefined}
                          data-hovered={!isActive && factor > 0 ? true : undefined}
                        />
                      ))}
                </Box>
              </Box>
            );
          })}
        </Box>
        {withIndicator && <LensSelectIndicator {...indicatorProps} />}
        {children}
      </Box>
    </LensSelectProvider>
  );
});

LensSelect.classes = classes;
LensSelect.displayName = 'LensSelect';
LensSelect.Indicator = LensSelectIndicator;

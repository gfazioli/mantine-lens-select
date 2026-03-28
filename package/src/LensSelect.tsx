import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import { LensSelectIndicator } from './LensSelectIndicator';
import { LensSelectMediaVariables } from './LensSelectMediaVariables';
import classes from './LensSelect.module.css';

export interface LensSelectItem {
  /** Unique value identifying this item */
  value: string | number;

  /** Content rendered inside the item. When omitted, a default pill (rounded rectangle) is rendered. */
  view?: React.ReactNode;
}

export type LensSelectStylesNames = 'root' | 'track' | 'item' | 'itemPill' | 'indicator';

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
    | '--ls-pill-color-active'
    | '--ls-indicator-size'
    | '--ls-indicator-color'
    | '--ls-indicator-offset';
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

  /** Gap between items, `2` by default. Supports responsive values. */
  gap?: StyleProp<number | string>;

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

  /** Height of the default pill, `'60%'` by default. Supports responsive values. */
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

  /** Color of the indicator dot, defaults to `activeColor` or theme primary */
  indicatorColor?: MantineColor;

  /** Diameter of the indicator dot in px, `6` by default. Supports responsive values. */
  indicatorSize?: StyleProp<number>;

  /** Distance between the indicator and the pills in px, `16` by default. Supports responsive values. */
  indicatorOffset?: StyleProp<number>;

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
  vars: LensSelectCssVariables;
  staticComponents: {
    Indicator: typeof LensSelectIndicator;
  };
}>;

const defaultProps: Partial<LensSelectProps> = {
  orientation: 'horizontal',
  magnification: 2,
  lensRange: 3,
  withScale: true,
  withOpacity: false,
  withBlur: false,
  opacityRange: [0.4, 1],
  blurRange: [0, 3],
  itemSize: 24,
  gap: 2,
  loop: false,
  transitionDuration: 200,
  withIndicator: false,
  pillHeight: '60%',
  pillWidth: 4,
  pillRadius: 'xl',
  indicatorSize: 6,
  indicatorOffset: 16,
  ariaLabel: 'Lens select',
};

const varsResolver = createVarsResolver<LensSelectFactory>(
  (
    theme,
    {
      transitionDuration,
      magnification,
      lensRange,
      pillRadius,
      pillColor,
      hoverColor,
      activeColor,
      indicatorColor,
    }
  ) => ({
    root: {
      '--ls-transition-duration': `${transitionDuration}ms`,
      '--ls-magnification': String(magnification),
      '--ls-range': String(lensRange),
      '--ls-pill-radius': pillRadius !== undefined ? getRadius(pillRadius) : undefined,
      '--ls-pill-color': pillColor ? getThemeColor(pillColor, theme) : undefined,
      '--ls-pill-color-hover': hoverColor ? getThemeColor(hoverColor, theme) : undefined,
      '--ls-pill-color-active': activeColor ? getThemeColor(activeColor, theme) : undefined,
      '--ls-indicator-color': indicatorColor
        ? getThemeColor(indicatorColor, theme)
        : activeColor
          ? getThemeColor(activeColor, theme)
          : undefined,
      // Responsive vars (itemSize, gap, pillHeight, pillWidth, indicatorSize, indicatorOffset)
      // are handled by LensSelectMediaVariables
      '--ls-item-size': undefined as unknown as string,
      '--ls-gap': undefined as unknown as string,
      '--ls-pill-height': undefined as unknown as string,
      '--ls-pill-width': undefined as unknown as string,
      '--ls-indicator-size': undefined as unknown as string,
      '--ls-indicator-offset': undefined as unknown as string,
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
    indicatorColor: _indicatorColor,
    indicatorSize: _indicatorSize,
    indicatorOffset: _indicatorOffset,
    ariaLabel,
    children,
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

  const updateScaleFactors = useCallback(
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
    },
    [items, orientation, maxRange]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const pos = orientation === 'horizontal' ? e.clientX : e.clientY;
      updateScaleFactors(pos);
      if (!isHovering) {
        setIsHovering(true);
      }
    },
    [orientation, updateScaleFactors, isHovering]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) {
        return;
      }
      const pos = orientation === 'horizontal' ? touch.clientX : touch.clientY;
      updateScaleFactors(pos);
      if (!isHovering) {
        setIsHovering(true);
      }
    },
    [orientation, updateScaleFactors, isHovering]
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

  const getItemStyle = useCallback(
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
        // When hovering: items near cursor are more opaque
        // When not hovering: all items at full opacity
        styleObj.opacity = isHovering ? minO + (maxO - minO) * factor : 1;
      }

      if (withBlur) {
        const [minB, maxB] = blurRange ?? [0, 3];
        // Invert: items near cursor have less blur
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
    }),
    [getStyles, items, _value, orientation, scaleFactors, isHovering, isPillMode]
  );

  return (
    <LensSelectProvider value={contextValue}>
      <LensSelectMediaVariables
        itemSize={itemSize}
        gap={gap}
        pillHeight={_pillHeight}
        pillWidth={_pillWidth}
        indicatorSize={_indicatorSize}
        indicatorOffset={_indicatorOffset}
        selector={`.${responsiveClassName}`}
      />
      <Box
        ref={mergedRootRef}
        {...getStyles('root', { className: responsiveClassName })}
        {...others}
        mod={[{ orientation }, mod]}
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

            return (
              <Box
                key={item.value}
                ref={(el: HTMLDivElement | null) => {
                  itemRefs.current[index] = el;
                }}
                {...getStyles('item')}
                style={getItemStyle(index)}
                role="option"
                aria-selected={isActive}
                data-active={isActive || undefined}
                data-pill={item.view == null && !renderItem ? true : undefined}
                data-index={index}
                onClick={() => handleChange(item.value)}
              >
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
            );
          })}
        </Box>
        {withIndicator && <LensSelectIndicator />}
        {children}
      </Box>
    </LensSelectProvider>
  );
});

LensSelect.classes = classes;
LensSelect.displayName = 'LensSelect';
LensSelect.Indicator = LensSelectIndicator;

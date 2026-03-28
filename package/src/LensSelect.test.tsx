import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '@mantine-tests/core';
import { LensSelect, LensSelectItem } from './LensSelect';

const TEST_DATA: LensSelectItem[] = [
  { value: 'item-1', view: <div>Item 1</div> },
  { value: 'item-2', view: <div>Item 2</div> },
  { value: 'item-3', view: <div>Item 3</div> },
  { value: 'item-4', view: <div>Item 4</div> },
  { value: 'item-5', view: <div>Item 5</div> },
];

describe('LensSelect', () => {
  // Rendering

  it('renders without crashing', () => {
    const { container } = render(<LensSelect />);
    expect(container).toBeTruthy();
  });

  it('renders without crashing with data', () => {
    const { container } = render(<LensSelect data={TEST_DATA} />);
    expect(container).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LensSelect ref={ref} data={TEST_DATA} />);
    expect(ref.current).toBeTruthy();
  });

  it('renders all items', () => {
    const { container } = render(<LensSelect data={TEST_DATA} />);
    const items = container.querySelectorAll('[role="option"]');
    expect(items.length).toBe(5);
  });

  it('has listbox role', () => {
    const { container } = render(<LensSelect data={TEST_DATA} />);
    const root = container.querySelector('[role="listbox"]');
    expect(root).toBeTruthy();
  });

  it('has aria-orientation attribute', () => {
    const { container } = render(<LensSelect data={TEST_DATA} orientation="vertical" />);
    const root = container.querySelector('[role="listbox"]');
    expect(root?.getAttribute('aria-orientation')).toBe('vertical');
  });

  // Default value / selection

  it('selects the first item by default', () => {
    const { container } = render(<LensSelect data={TEST_DATA} />);
    const active = container.querySelector('[data-active]');
    expect(active).toBeTruthy();
    expect(active?.getAttribute('data-index')).toBe('0');
  });

  it('selects the item matching defaultValue', () => {
    const { container } = render(<LensSelect data={TEST_DATA} defaultValue="item-3" />);
    const active = container.querySelector('[data-active]');
    expect(active?.getAttribute('data-index')).toBe('2');
  });

  // Controlled value

  it('supports controlled value', () => {
    const { container, rerender } = render(<LensSelect data={TEST_DATA} value="item-2" />);
    let active = container.querySelector('[data-active]');
    expect(active?.getAttribute('data-index')).toBe('1');

    rerender(<LensSelect data={TEST_DATA} value="item-4" />);
    active = container.querySelector('[data-active]');
    expect(active?.getAttribute('data-index')).toBe('3');
  });

  // Click selection

  it('selects item on click', () => {
    const onChange = jest.fn();
    const { container } = render(<LensSelect data={TEST_DATA} onChange={onChange} />);
    const items = container.querySelectorAll('[role="option"]');
    fireEvent.click(items[2]);
    expect(onChange).toHaveBeenCalledWith('item-3');
  });

  // Keyboard navigation — horizontal

  it('navigates right with ArrowRight (horizontal)', () => {
    const onChange = jest.fn();
    const { container } = render(<LensSelect data={TEST_DATA} onChange={onChange} />);
    const root = container.querySelector('[role="listbox"]')!;
    fireEvent.keyDown(root, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  it('navigates left with ArrowLeft (horizontal)', () => {
    const onChange = jest.fn();
    const { container } = render(
      <LensSelect data={TEST_DATA} defaultValue="item-3" onChange={onChange} />
    );
    const root = container.querySelector('[role="listbox"]')!;
    fireEvent.keyDown(root, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  // Keyboard navigation — vertical

  it('navigates down with ArrowDown (vertical)', () => {
    const onChange = jest.fn();
    const { container } = render(
      <LensSelect data={TEST_DATA} orientation="vertical" onChange={onChange} />
    );
    const root = container.querySelector('[role="listbox"]')!;
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  // Home / End

  it('navigates to first item with Home', () => {
    const onChange = jest.fn();
    const { container } = render(
      <LensSelect data={TEST_DATA} defaultValue="item-4" onChange={onChange} />
    );
    const root = container.querySelector('[role="listbox"]')!;
    fireEvent.keyDown(root, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith('item-1');
  });

  it('navigates to last item with End', () => {
    const onChange = jest.fn();
    const { container } = render(<LensSelect data={TEST_DATA} onChange={onChange} />);
    const root = container.querySelector('[role="listbox"]')!;
    fireEvent.keyDown(root, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith('item-5');
  });

  // Loop

  it('loops from last to first when loop is enabled', () => {
    const onChange = jest.fn();
    const { container } = render(
      <LensSelect data={TEST_DATA} defaultValue="item-5" loop onChange={onChange} />
    );
    const root = container.querySelector('[role="listbox"]')!;
    fireEvent.keyDown(root, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('item-1');
  });

  it('does not loop when loop is disabled', () => {
    const onChange = jest.fn();
    const { container } = render(
      <LensSelect data={TEST_DATA} defaultValue="item-5" onChange={onChange} />
    );
    const root = container.querySelector('[role="listbox"]')!;
    fireEvent.keyDown(root, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('item-5');
  });

  // Indicator

  it('renders indicator by default', () => {
    const { container } = render(<LensSelect data={TEST_DATA} />);
    const indicator = container.querySelector('.mantine-LensSelect-indicator');
    expect(indicator).toBeTruthy();
  });

  it('does not render indicator when withIndicator is false', () => {
    const { container } = render(<LensSelect data={TEST_DATA} withIndicator={false} />);
    const indicator = container.querySelector('.mantine-LensSelect-indicator');
    expect(indicator).toBeNull();
  });

  // Orientation data attribute

  it('sets horizontal orientation by default', () => {
    const { container } = render(<LensSelect data={TEST_DATA} />);
    const root = container.querySelector('[role="listbox"]');
    expect(root?.getAttribute('data-orientation')).toBe('horizontal');
  });

  it('sets vertical orientation', () => {
    const { container } = render(<LensSelect data={TEST_DATA} orientation="vertical" />);
    const root = container.querySelector('[role="listbox"]');
    expect(root?.getAttribute('data-orientation')).toBe('vertical');
  });

  // Custom rendering

  it('uses renderItem when provided', () => {
    const renderItem = jest.fn((item) => <span data-testid="custom">{String(item.value)}</span>);
    const { container } = render(<LensSelect data={TEST_DATA} renderItem={renderItem} />);
    const custom = container.querySelectorAll('[data-testid="custom"]');
    expect(custom.length).toBe(5);
    expect(renderItem).toHaveBeenCalledTimes(5);
  });

  // Empty data

  it('renders without items when data is empty', () => {
    const { container } = render(<LensSelect data={[]} />);
    const items = container.querySelectorAll('[role="option"]');
    expect(items.length).toBe(0);
  });

  // Compound component

  it('has Indicator static component', () => {
    expect(LensSelect.Indicator).toBeDefined();
    expect(LensSelect.Indicator.displayName).toBe('LensSelectIndicator');
  });
});

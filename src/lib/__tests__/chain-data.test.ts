import { describe, it, expect } from 'vitest';
import { renderCPUCores, renderRAM, renderStorage, renderBandwidth } from '../chain-data';

describe('render helpers', () => {
  it('renders CPU cores correctly', () => {
    expect(renderCPUCores(1)).toBe('1 core');
    expect(renderCPUCores(4)).toBe('4 cores');
  });

  it('renders RAM with GB', () => {
    expect(renderRAM(8)).toBe('8 GB');
  });

  it('renders storage in GB or TB', () => {
    expect(renderStorage(500)).toBe('500 GB');
    expect(renderStorage(1500)).toBe('1.50 TB');
    expect(renderStorage(2000)).toBe('2 TB');
  });

  it('renders bandwidth descriptions', () => {
    expect(renderBandwidth(5)).toBe('~ 5 TB/month');
    expect(renderBandwidth(15)).toBe('> 10TB/month');
  });
});

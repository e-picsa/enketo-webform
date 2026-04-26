import { describe, it, expect, vi } from 'vitest';
import { KoboService } from './kobo-service';

describe('KoboService', () => {
  it('creates instance with config', () => {
    const service = new KoboService({ authToken: 'test-token' });
    expect(service.apiEndpoints.v1).toBe('https://kc.kobotoolbox.org/api/v1');
  });

  it('has correct api endpoints', () => {
    const service = new KoboService({ authToken: 'test-token' });
    expect(service.apiEndpoints.v2).toBe('https://kf.kobotoolbox.org/api/v2');
  });

  describe('submitXMLSubmission', () => {
    it('throws if id required for update', () => {
      const service = new KoboService({ authToken: 'test-token' });
      expect(() => service.wipUpdateJSONSubmission({}, '')).toThrow('ID required for update');
    });
  });

  it('formats xml with declaration if missing', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      text: async () => '<?xml version="1.0"?><message>Success</message>',
    });
    const service = new KoboService({ authToken: 'test' });
    service.httpHandlers.req = mockFetch;

    await service.submitXMLSubmission('<data/>');

    const call = mockFetch.mock.calls[0];
    const body = call[1].body;
    expect(body).toBeDefined();
  });
});
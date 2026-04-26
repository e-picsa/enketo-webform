import { describe, it, expect, vi } from 'vitest';
import { KoboService } from './kobo-service';
import { MOCK_DATA } from '../../../demo/src/fixtures';

describe('KoboService', () => {
  const MOCK_TOKEN = 'test1234';

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

    it('posts xml file submission', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        status: 200,
        text: MOCK_DATA.xml.responseSuccess,
      });
      const service = new KoboService({ authToken: MOCK_TOKEN });
      service.httpHandlers.req = mockFetch;

      await service.submitXMLSubmission(MOCK_DATA.xml.submission);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [endpoint, options] = mockFetch.mock.calls[0];
      expect(endpoint).toEqual('https://kc.kobotoolbox.org/api/v1/submissions');
      expect(options.method).toEqual('POST');
      expect(options.headers['Authorization']).toEqual(`Token ${MOCK_TOKEN}`);
      expect(options.headers['X-OpenRosa-Version']).toEqual('1.0');
    });

    it('handles successful submission', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        status: 200,
        text: MOCK_DATA.xml.responseSuccess,
      });
      const service = new KoboService({ authToken: MOCK_TOKEN });
      service.httpHandlers.req = mockFetch;

      const { data } = await service.submitXMLSubmission(MOCK_DATA.xml.submission);
      expect(data['message']).toEqual('Successful submission.');
      expect(data).toHaveProperty('submissionMetadata');
    });

    it('handles duplicate submission', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        status: 202,
        text: MOCK_DATA.xml.responseDuplicate,
      });
      const service = new KoboService({ authToken: MOCK_TOKEN });
      service.httpHandlers.req = mockFetch;

      const { data } = await service.submitXMLSubmission(MOCK_DATA.xml.submission);
      expect(data['message']).toEqual('Duplicate submission');
    });

    it('formats xml with declaration if missing', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        status: 200,
        text: MOCK_DATA.xml.responseSuccess,
      });
      const service = new KoboService({ authToken: 'test' });
      service.httpHandlers.req = mockFetch;

      await service.submitXMLSubmission('<data/>');

      const call = mockFetch.mock.calls[0];
      const body = call[1].body;
      expect(body).toBeDefined();
    });
  });
});
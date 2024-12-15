import { IpAddressPipe } from './ip-address.pipe';
import { Utils } from '../../modules/networking/utils';

describe('IpAddressPipe', () => {
  let pipe: IpAddressPipe;

  beforeEach(() => (pipe = new IpAddressPipe()));

  it('should return string of ip-address', () => {
    const ip = Utils.IpAddressToNumber([127, 0, 0, 1]);

    const result = pipe.transform(ip);

    expect(result).toEqual('127.0.0.1');
  });

  it('should return zeros without value', () => {
    const result = pipe.transform();
    expect(result).toEqual('0.0.0.0');
  });
});

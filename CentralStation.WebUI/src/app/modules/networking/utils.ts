export class Utils {
  static IpAddressToNumber(address: number[]): number {
    let result = 0;
    result += address[0] << 24;
    result += address[1] << 16;
    result += address[2] << 8;
    result += address[3];
    return result;
  }

  static NumberToIpAddress(address: number): [number, number, number, number] {
    return [
      (address >> 24) & 255,
      (address >> 16) & 255,
      (address >> 8) & 255,
      address & 255,
    ];
  }
}

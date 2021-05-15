#!/usr/bin/env node

// imports
const getBatteryLevel = require('battery-level');
const getOsxBattery = require('osx-battery');
const say = require('say');

let settings = {
  enabled: true,
  lowWarningThreshold: 10,
  highWarningThreshold: 90,
  checkRepeatTime: 60 * 1000 * 2, // 2 minutes
  isContinuous: process.argv[2] === 'continuous'
}

const checkChargeStatus = async() => {
  const now = new Date();
  const currentBatteryLevel = await getBatteryLevel() * 100;
  const batteryInfo = await getOsxBattery();
  const {isCharging} = batteryInfo;

  console.log('Current Date/Time: ' + now.toLocaleDateString() + ' ' + now.toLocaleTimeString());
  console.log('Current Battery Level: ' + currentBatteryLevel);
  console.log('Currently Charging: ' + isCharging);
  console.log('');

  if (settings.enabled) {
    if(currentBatteryLevel <= settings.lowWarningThreshold && !isCharging) {
      say.speak('Battery is low. Plug in now!');
    } else if (currentBatteryLevel >= settings.highWarningThreshold && isCharging) {
      say.speak('Battery is sufficiently charged. Unplug now!');
    }
  }

  // check again and repeat the prompt
  if (settings.isContinuous) {
    setTimeout(checkChargeStatus, settings.checkRepeatTime);
  }
}

// checkChargeStatus the app
(async () => {
  if (!settings.isContinuous) {
    console.log('To run in continuous mode, add the "continuous" argument to the command line.\r\n');
  }
  console.log('Continuous mode: ' + settings.isContinuous + '\r\n');
  checkChargeStatus();
})();





// real world example data

const mbp16_external_thunderbolt_monitor = `
{
  adapterDetails: {
    adapterID: 0,
    current: 3000,
    description: 'pd charger',
    familyCode: -536854518,
    isWireless: false,
    pMUConfiguration: 0,
    voltage: 5000,
    watts: 15
  },
  adapterInfo: 0,
  amperage: -5110,
  appleRawAdapterDetails: [
    {
      AdapterID: 0,
      Current: 3000,
      Description: 'pd charger',
      FamilyCode: -536854518,
      IsWireless: false,
      PMUConfiguration: 0,
      Voltage: 5000,
      Watts: 15
    }
  ],
  appleRawCurrentCapacity: 1768,
  appleRawMaxCapacity: 6924,
  avgTimeToEmpty: 21,
  avgTimeToFull: 65535,
  batteryData: {
    adapterPower: 1095602902,
    batteryState: <Buffer 00 00 00 00 00 00 00 00 c3 e4 00 02 02 00 00 10>,
    cellVoltage: [ 3589, 3586, 3578 ],
    chemID: 8978,
    cycleCount: 168,
    dOD0: [ 7648, 7584, 7648 ],
    dataFlashWriteCount: 6917,
    designCapacity: 8790,
    fccComp1: 7363,
    fccComp2: 6924,
    flags: 557318657,
    gaugeFlagRaw: 192,
    lifetimeData: {
      AverageTemperature: 0,
      TimeAtHighSoc: <Buffer 1d 00 00 00 f3 11 00 00 de 0d 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 24 00 00 00 96 03 00 00 7b 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 62 more bytes>,
      TotalOperatingTime: 12869,
      UpdateTime: 1621099274
    },
    manufactureDate: 58489689945906,
    pMUConfigured: 2508,
    passedCharge: 1534,
    presentDOD: [ 70, 70, 70 ],
    qmax: [ 8383, 8425, 8388 ],
    raTableRaw: [
      <Buffer 00 55 00 64 00 32 00 31 00 34 00 34 00 2c 00 2e 00 30 00 31 00 32 00 32 00 36 00 3c 00 66 00 a9>,
      <Buffer 00 00 00 65 00 32 00 31 00 34 00 32 00 2b 00 2e 00 31 00 32 00 34 00 34 00 3b 00 47 00 8b 00 d7>,
      <Buffer 00 00 00 77 00 3b 00 39 00 3b 00 39 00 31 00 32 00 35 00 38 00 3a 00 3b 00 3f 00 4d 00 7d 00 ca>
    ],
    resScale: 244,
    serial: 'F5D94811853K7LQA0',
    stateOfCharge: 26,
    systemPower: 1115012006,
    voltage: 10865
  },
  batteryInstalled: true,
  batteryInvalidWakeSeconds: 30,
  bestAdapterIndex: 3,
  bootPathUpdated: 1621044296,
  chargerData: {
    chargingCurrent: 5016,
    chargingVoltage: 12628,
    notChargingReason: 0,
    vacVoltageLimit: 4210
  },
  chargingOverride: 0,
  currentCapacity: 1768,
  cycleCount: 168,
  designCapacity: 8790,
  designCycleCount70: 13,
  designCycleCount9C: 1000,
  deviceName: 'bq40z651',
  externalChargeCapable: true,
  externalConnected: true,
  firmwareSerialNumber: 1,
  fullPathUpdated: 1621098734,
  fullyCharged: false,
  iOGeneralInterest: 'IOCommand is not serializable',
  iOObjectClass: 'AppleSmartBattery',
  iOObjectRetainCount: 6,
  iORegistryEntryID: 4294968257,
  iORegistryEntryName: 'AppleSmartBattery',
  iOReportLegend: [
    {
      IOReportChannelInfo: [Object],
      IOReportChannels: [Array],
      IOReportGroupName: 'Battery'
    }
  ],
  iOReportLegendPublic: true,
  iOServiceBusyState: 0,
  iOServiceBusyTime: 17717,
  iOServiceState: 30,
  instantAmperage: -4519,
  instantTimeToEmpty: 39,
  isCharging: false,
  legacyBatteryInfo: {
    amperage: -5110,
    capacity: 6924,
    current: 1768,
    'cycle Count': 168,
    flags: 5,
    voltage: 10752
  },
  location: 0,
  manufacturer: 'DSY',
  manufacturerData: <Buffer 00 00 00 00 0b 00 03 00 08 09 00 00 04 31 33 37 37 03 30 31 39 03 41 54 4c 00 01>,
  maxCapacity: 6924,
  maxErr: 2,
  operationStatus: 58563,
  packReserve: 244,
  permanentFailureStatus: 0,
  postChargeWaitSeconds: 120,
  postDischargeWaitSeconds: 120,
  serial: 'F5D94811853K7LQA0',
  temperature: 2939,
  timeRemaining: 21,
  updateTime: 1621099274,
  userVisiblePathUpdated: 1621099274,
  voltage: 10752
}
`;


const mbp16_external_thunderbolt_monitor_plus_oem_power_adapter = `
{
  adapterDetails: {
    adapterID: 28674,
    current: 4700,
    description: 'pd charger',
    familyCode: -536854518,
    fwVersion: '01070051',
    hwVersion: '1.0',
    isWireless: false,
    manufacturer: 'Apple Inc.',
    model: '0x7002',
    name: '96W USB-C Power Adapter',
    pMUConfiguration: 4648,
    serialString: 'C4H943308K8L4YQA3',
    voltage: 20000,
    watts: 94
  },
  adapterInfo: 0,
  amperage: 610,
  appleRawAdapterDetails: [
    {
      AdapterID: 28674,
      Current: 4700,
      Description: 'pd charger',
      FamilyCode: -536854518,
      FwVersion: '01070051',
      HwVersion: '1.0',
      IsWireless: false,
      Manufacturer: 'Apple Inc.',
      Model: '0x7002',
      Name: '96W USB-C Power Adapter',
      PMUConfiguration: 4648,
      SerialString: 'C4H943308K8L4YQA3',
      Voltage: 20000,
      Watts: 94
    },
    {
      AdapterID: 0,
      Current: 3000,
      Description: 'pd charger',
      FamilyCode: -536854518,
      IsWireless: false,
      PMUConfiguration: 4648,
      Voltage: 5000,
      Watts: 15
    }
  ],
  appleRawCurrentCapacity: 1486,
  appleRawMaxCapacity: 7194,
  avgTimeToEmpty: 65535,
  avgTimeToFull: 566,
  batteryData: {
    adapterPower: 1114334575,
    batteryState: <Buffer 00 00 00 00 00 00 00 00 83 e4 40 02 02 00 00 10>,
    cellVoltage: [ 3737, 3740, 3754 ],
    chemID: 8978,
    cycleCount: 168,
    dOD0: [ 7648, 7584, 7648 ],
    dataFlashWriteCount: 6917,
    designCapacity: 8790,
    fccComp1: 7633,
    fccComp2: 7194,
    flags: 557318657,
    gaugeFlagRaw: 128,
    lifetimeData: {
      AverageTemperature: 0,
      TimeAtHighSoc: <Buffer 1d 00 00 00 f3 11 00 00 de 0d 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 24 00 00 00 96 03 00 00 7b 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 62 more bytes>,
      TotalOperatingTime: 12869,
      UpdateTime: 1621099873
    },
    manufactureDate: 58489689945906,
    pMUConfigured: 512,
    passedCharge: 2603,
    presentDOD: [ 77, 76, 77 ],
    qmax: [ 8383, 8425, 8388 ],
    raTableRaw: [
      <Buffer 00 55 00 64 00 32 00 31 00 34 00 34 00 2c 00 2e 00 30 00 31 00 32 00 32 00 36 00 3c 00 66 00 a9>,
      <Buffer 00 00 00 65 00 32 00 31 00 34 00 32 00 2b 00 2e 00 31 00 32 00 34 00 34 00 3b 00 47 00 8b 00 d7>,
      <Buffer 00 00 00 77 00 3b 00 39 00 3b 00 39 00 31 00 32 00 35 00 38 00 3a 00 3b 00 3f 00 4d 00 7d 00 ca>
    ],
    resScale: 244,
    serial: 'F5D94811853K7LQA0',
    stateOfCharge: 21,
    systemPower: 1110178085,
    voltage: 11222
  },
  batteryInstalled: true,
  batteryInvalidWakeSeconds: 30,
  bestAdapterIndex: 2,
  bootPathUpdated: 1621044296,
  chargerData: {
    chargingCurrent: 1024,
    chargingVoltage: 12628,
    notChargingReason: 0,
    vacVoltageLimit: 4210
  },
  chargingOverride: 0,
  currentCapacity: 1486,
  cycleCount: 168,
  designCapacity: 8790,
  designCycleCount70: 13,
  designCycleCount9C: 1000,
  deviceName: 'bq40z651',
  externalChargeCapable: true,
  externalConnected: true,
  firmwareSerialNumber: 1,
  fullPathUpdated: 1621099873,
  fullyCharged: false,
  iOGeneralInterest: 'IOCommand is not serializable',
  iOObjectClass: 'AppleSmartBattery',
  iOObjectRetainCount: 6,
  iORegistryEntryID: 4294968257,
  iORegistryEntryName: 'AppleSmartBattery',
  iOReportLegend: [
    {
      IOReportChannelInfo: [Object],
      IOReportChannels: [Array],
      IOReportGroupName: 'Battery'
    }
  ],
  iOReportLegendPublic: true,
  iOServiceBusyState: 0,
  iOServiceBusyTime: 17717,
  iOServiceState: 30,
  instantAmperage: 958,
  instantTimeToEmpty: 65535,
  isCharging: true,
  legacyBatteryInfo: {
    amperage: 610,
    capacity: 7194,
    current: 1486,
    'cycle Count': 168,
    flags: 7,
    voltage: 11222
  },
  location: 0,
  manufacturer: 'DSY',
  manufacturerData: <Buffer 00 00 00 00 0b 00 03 00 08 09 00 00 04 31 33 37 37 03 30 31 39 03 41 54 4c 00 01>,
  maxCapacity: 7194,
  maxErr: 2,
  operationStatus: 58499,
  packReserve: 244,
  permanentFailureStatus: 0,
  postChargeWaitSeconds: 120,
  postDischargeWaitSeconds: 120,
  serial: 'F5D94811853K7LQA0',
  temperature: 3073,
  timeRemaining: 566,
  updateTime: 1621099873,
  userVisiblePathUpdated: 1621099873,
  voltage: 11222
}
`;

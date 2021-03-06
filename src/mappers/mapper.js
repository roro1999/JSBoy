define([
    'mappers/rom',
    'mappers/mbc1',
    'mappers/mbc2',
    'mappers/mbc3',
    'mappers/mbc5'
], function (mapperROM, mapperMBC1, mapperMBC2, mapperMBC3, mapperMBC5) {
    function byteAlignment(size, base)
    {
        if( base === undefined )
            base = 1;

        while( base < size )
            base <<= 1;

        return base;
    }

    function mapper( name, cpu, rom )
    {
        var description = {
            mapper: rom[0x0147],
            romSize: rom.length, //rom[0x0148],
            ramSize: [0,2048,8192,32768][rom[0x0149]]
        };

        var setups = {
              '1': { call:   mapperMBC1, flags:               NONE },
              '2': { call:   mapperMBC1, flags:                RAM },
              '3': { call:   mapperMBC1, flags:        RAM|BATTERY },
              '5': { call:   mapperMBC2, flags:               NONE },
              '6': { call:   mapperMBC2, flags:            BATTERY },
              '8': { call:    mapperROM, flags:                RAM },
              '9': { call:    mapperROM, flags:        RAM|BATTERY },
/*
             '11': { call:  mapperMMM01, flags:               NONE },
             '12': { call:  mapperMMM01, flags:                RAM },
             '13': { call:  mapperMMM01, flags:        RAM|BATTERY },
             '15': { call:   mapperMBC3, flags:      TIMER|BATTERY },
             '16': { call:   mapperMBC3, flags:  TIMER|RAM|BATTERY },
*/
             '17': { call:   mapperMBC3, flags:               NONE },
             '18': { call:   mapperMBC3, flags:                RAM },
             '19': { call:   mapperMBC3, flags:        RAM|BATTERY },
/*
             '21': { call:   mapperMBC4, flags:               NONE },
             '22': { call:   mapperMBC4, flags:                RAM },
             '23': { call:   mapperMBC4, flags:        RAM|BATTERY },
*/
             '25': { call:   mapperMBC5, flags:               NONE },
             '26': { call:   mapperMBC5, flags:                RAM },
             '27': { call:   mapperMBC5, flags:        RAM|BATTERY },
/*
             '28': { call:   mapperMBC5, flags:             RUMBLE },
             '29': { call:   mapperMBC5, flags:         RUMBLE|RAM },
             '30': { call:   mapperMBC5, flags: RUMBLE|RAM|BATTERY }
            '252': { call: mapperCAMERA, flags:               NONE },
            '253': { call:  mapperTAMA5, flags:               NONE },
            '254': { call:   mapperHuC3, flags:               NONE },
            '255': { call:   mapperHuC1, flags:        RAM|BATTERY },
*/
              '0': { call:    mapperROM, flags:               NONE }
        };

        // Convert rom into data delegates (padded out to 32k, or next highest power of 2)
        rom = romBlock(rom, byteAlignment(rom.length, 0x4000) );

        var code = description.mapper;
        var setup = setups[code];

        if( setups[code] === undefined )
        {
            log( "Mapper type", code, "is unsupported." );
            return null;
        }

        return new (setup.call)(name, cpu, rom, description.ramSize, setups[code].flags, description );
    }

    return mapper;
});

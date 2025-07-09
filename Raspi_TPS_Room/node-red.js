[
    {
        "id": "3a463f0a1168d93d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Roller Arm ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"roller_arm\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 740,
        "wires": [
            [
                "ed48e5fada1e2003"
            ]
        ]
    },
    {
        "id": "3ceef6a9d2b7f978",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Roller Arm ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"roller_arm\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 770,
        "wires": [
            [
                "ed48e5fada1e2003"
            ]
        ]
    },
    {
        "id": "1f8d437d70640ebe",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR2 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_2\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 4400,
        "wires": [
            [
                "f5c96f250dd468b6"
            ]
        ]
    },
    {
        "id": "acc84ca15e60ffd0",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR2 ALL PM 220",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_2\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 4430,
        "wires": [
            [
                "f5c96f250dd468b6"
            ]
        ]
    },
    {
        "id": "cbd89c200a23fefd",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR1 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_1\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 4190,
        "wires": [
            [
                "ce13aea86bd33580"
            ]
        ]
    },
    {
        "id": "20793794fc6e8235",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR1 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_1\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 4220,
        "wires": [
            [
                "ce13aea86bd33580"
            ]
        ]
    },
    {
        "id": "6eb6c7f5adef9076",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR3 ALL PM 200",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_3\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 4610,
        "wires": [
            [
                "3756db50d398c957"
            ]
        ]
    },
    {
        "id": "3f215cf58e0a619f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR3 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_3\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 4640,
        "wires": [
            [
                "3756db50d398c957"
            ]
        ]
    },
    {
        "id": "9964f4d6add0c8b7",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR4 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_4\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 4850,
        "wires": [
            [
                "b976c771bfd3b926"
            ]
        ]
    },
    {
        "id": "cf3ebbe87aa0f78b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR4 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_4\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 4820,
        "wires": [
            [
                "b976c771bfd3b926"
            ]
        ]
    },
    {
        "id": "a7df4d0dfe77fa6a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR5 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_5\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5060,
        "wires": [
            [
                "86152394bd456f5e"
            ]
        ]
    },
    {
        "id": "1fb5ef5be0934aad",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR5 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_5\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5030,
        "wires": [
            [
                "86152394bd456f5e"
            ]
        ]
    },
    {
        "id": "f985959131e9ea50",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR6 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_6\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5270,
        "wires": [
            [
                "a1b85940a46da258"
            ]
        ]
    },
    {
        "id": "8ed4adfd9d5d426d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR6 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_6\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5240,
        "wires": [
            [
                "a1b85940a46da258"
            ]
        ]
    },
    {
        "id": "ffc1af3c5d6744d5",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR7 ALL PM 200",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_7\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5450,
        "wires": [
            [
                "f62ba98798e421dd"
            ]
        ]
    },
    {
        "id": "e5d7f0d94d0e06a2",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR7 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_7\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5480,
        "wires": [
            [
                "f62ba98798e421dd"
            ]
        ]
    },
    {
        "id": "491ee2a50d4e288d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR8 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_8\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5690,
        "wires": [
            [
                "13978c8a032482a9"
            ]
        ]
    },
    {
        "id": "da58225190854671",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR8 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_8\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5660,
        "wires": [
            [
                "13978c8a032482a9"
            ]
        ]
    },
    {
        "id": "aebe97b77166f16b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR9 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_9\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5870,
        "wires": [
            [
                "91e5c2a74d54df3a"
            ]
        ]
    },
    {
        "id": "20ed54a447bb2cc3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR9 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_9\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 5900,
        "wires": [
            [
                "91e5c2a74d54df3a"
            ]
        ]
    },
    {
        "id": "077b1b70dd970272",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR10 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_10\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 6110,
        "wires": [
            [
                "a009dd0d7035d950"
            ]
        ]
    },
    {
        "id": "e7ee13f16006452e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR10 ALL PM 200",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_10\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 6080,
        "wires": [
            [
                "a009dd0d7035d950"
            ]
        ]
    },
    {
        "id": "30198fcf27dd9870",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR11 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_11\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 6320,
        "wires": [
            [
                "04a0090e55801722"
            ]
        ]
    },
    {
        "id": "6d7dfb2cd7e912be",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR11 ALL PM 200",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_11\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 6290,
        "wires": [
            [
                "04a0090e55801722"
            ]
        ]
    },
    {
        "id": "91ec7253a96beec1",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR12 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_12\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 6500,
        "wires": [
            [
                "61f8f71b4fa369c7"
            ]
        ]
    },
    {
        "id": "26056092c16e7804",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CR12 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_12\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 6530,
        "wires": [
            [
                "61f8f71b4fa369c7"
            ]
        ]
    },
    {
        "id": "dc697224cb8cb0a1",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing AB PM200V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"DPCH\" && power_meter === \"PM-200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1610,
        "wires": [
            [
                "fd4abfb53a803042"
            ]
        ]
    },
    {
        "id": "aed68f3c292e9ad7",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing AB PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"DPCH\" && power_meter === \"PM-220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1580,
        "wires": [
            [
                "fd4abfb53a803042"
            ]
        ]
    },
    {
        "id": "2df13014ff83261a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing CD PM200V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"DPCH-CD\" && power_meter === \"PM-3F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1820,
        "wires": [
            [
                "f3ecd6cf585abc20"
            ]
        ]
    },
    {
        "id": "282b9c45550f4bde",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing CD PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"DPCH-CD\" && power_meter === \"PM-1F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1790,
        "wires": [
            [
                "f3ecd6cf585abc20"
            ]
        ]
    },
    {
        "id": "600e2d3d5c72281f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "retainer_pm200",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"RET\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 3220,
        "wires": [
            [
                "051ef22d8ad711e3"
            ]
        ]
    },
    {
        "id": "768898ec3e9a5d48",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "retainer_pm220",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"RET\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 3190,
        "wires": [
            [
                "051ef22d8ad711e3"
            ]
        ]
    },
    {
        "id": "b16e221499b926e0",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Balance Shaft 1 PM200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"BS_1\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 1190,
        "wires": [
            [
                "fbcf7df33f78654d"
            ]
        ]
    },
    {
        "id": "59a2083c26ae2bbf",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Balance Shaft 1 PM220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"BS_1\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 1160,
        "wires": [
            [
                "fbcf7df33f78654d"
            ]
        ]
    },
    {
        "id": "4ae9fcf394af70f0",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Balance Shaft 2 PM200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"BS_2\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 1400,
        "wires": [
            [
                "91323d01f5730590"
            ]
        ]
    },
    {
        "id": "c2b533886b568e05",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Balance Shaft 2 PM220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"BS_2\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1110,
        "y": 1370,
        "wires": [
            [
                "91323d01f5730590"
            ]
        ]
    },
    {
        "id": "60cbe72b546f6933",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing EF PM220V",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_EF\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2980,
        "wires": [
            [
                "885db9b738c487ad"
            ]
        ]
    },
    {
        "id": "dbdff6c3a0a0279d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing EF PM200V",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_EF\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3010,
        "wires": [
            [
                "885db9b738c487ad"
            ]
        ]
    },
    {
        "id": "3147d367d91b9047",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing SAC PM220V",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2420,
        "wires": [
            [
                "99ce4aa3cfa81395"
            ]
        ]
    },
    {
        "id": "80ac40952f269b80",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing SAC PM200V",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2450,
        "wires": [
            [
                "99ce4aa3cfa81395"
            ]
        ]
    },
    {
        "id": "e42735596f862d9a",
        "type": "string",
        "z": "cacd99a553161a6b",
        "name": "filter_energy_line_all",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 180,
        "y": 820,
        "wires": [
            [
                "3a463f0a1168d93d",
                "3ceef6a9d2b7f978",
                "1f8d437d70640ebe",
                "acc84ca15e60ffd0",
                "cbd89c200a23fefd",
                "20793794fc6e8235",
                "6eb6c7f5adef9076",
                "3f215cf58e0a619f",
                "9964f4d6add0c8b7",
                "cf3ebbe87aa0f78b",
                "a7df4d0dfe77fa6a",
                "1fb5ef5be0934aad",
                "f985959131e9ea50",
                "8ed4adfd9d5d426d",
                "ffc1af3c5d6744d5",
                "e5d7f0d94d0e06a2",
                "491ee2a50d4e288d",
                "da58225190854671",
                "aebe97b77166f16b",
                "20ed54a447bb2cc3",
                "077b1b70dd970272",
                "e7ee13f16006452e",
                "30198fcf27dd9870",
                "6d7dfb2cd7e912be",
                "91ec7253a96beec1",
                "26056092c16e7804",
                "dc697224cb8cb0a1",
                "aed68f3c292e9ad7",
                "2df13014ff83261a",
                "282b9c45550f4bde",
                "600e2d3d5c72281f",
                "768898ec3e9a5d48",
                "b16e221499b926e0",
                "59a2083c26ae2bbf",
                "4ae9fcf394af70f0",
                "c2b533886b568e05",
                "60cbe72b546f6933",
                "dbdff6c3a0a0279d",
                "3147d367d91b9047",
                "80ac40952f269b80",
                "f85787c28386aff1",
                "b52d187a718f6a3e",
                "ee2b6da7a4be1364",
                "e53efb38cac7d555",
                "9b482e66887bad8d",
                "33e05d82e5ca172c",
                "569393eaeb556be7",
                "cb409db29024d507",
                "070f11991df89b59",
                "1e5a3be3b95e3931",
                "0d48f113df9cc2dc",
                "dfb516c4c5748765",
                "ef3c914f80fcd326",
                "677a7bab739e4db8",
                "63e29a3eeea64dfd",
                "46c33b74ae839be9",
                "7a0d0d04abce52dc",
                "eb052ee682167e26",
                "720bf3d756eff672"
            ]
        ]
    },
    {
        "id": "ed48e5fada1e2003",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "feb72a0a0524a815",
        "name": "",
        "x": 1370,
        "y": 740,
        "wires": [
            [
                "6347726e1781f063"
            ]
        ]
    },
    {
        "id": "ce13aea86bd33580",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f9015eda0438d8d1",
        "name": "",
        "x": 1350,
        "y": 4190,
        "wires": [
            [
                "b05d003511dcf2a5"
            ]
        ]
    },
    {
        "id": "f5c96f250dd468b6",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "d925402c7a20657e",
        "name": "",
        "x": 1350,
        "y": 4400,
        "wires": [
            [
                "a1211d101f5ca905"
            ]
        ]
    },
    {
        "id": "3756db50d398c957",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "bce909d680d0bb39",
        "name": "",
        "x": 1350,
        "y": 4610,
        "wires": [
            [
                "ce20068a50d36975"
            ]
        ]
    },
    {
        "id": "b976c771bfd3b926",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "b2c30c30e281316c",
        "name": "",
        "x": 1350,
        "y": 4820,
        "wires": [
            [
                "8fe722b59c6f427d"
            ]
        ]
    },
    {
        "id": "86152394bd456f5e",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "e2a1621409270777",
        "name": "",
        "x": 1350,
        "y": 5030,
        "wires": [
            [
                "1a2c2c1a72286835"
            ]
        ]
    },
    {
        "id": "a1b85940a46da258",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f3e0e313401a2713",
        "name": "",
        "x": 1350,
        "y": 5240,
        "wires": [
            [
                "345f9ec8f54e58df"
            ]
        ]
    },
    {
        "id": "f62ba98798e421dd",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "05455fdbc2930db7",
        "name": "",
        "x": 1350,
        "y": 5450,
        "wires": [
            [
                "881a033878f3552b"
            ]
        ]
    },
    {
        "id": "a009dd0d7035d950",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "1dc1f7d786abecba",
        "name": "",
        "x": 1340,
        "y": 6080,
        "wires": [
            [
                "8a5825829b8d9ae0"
            ]
        ]
    },
    {
        "id": "13978c8a032482a9",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "64d9fc8d1d052290",
        "name": "",
        "x": 1350,
        "y": 5660,
        "wires": [
            [
                "9d13b0b40a46c4d9"
            ]
        ]
    },
    {
        "id": "91e5c2a74d54df3a",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "670017ae691633be",
        "name": "",
        "x": 1350,
        "y": 5870,
        "wires": [
            [
                "f5a8a58f6beca575"
            ]
        ]
    },
    {
        "id": "04a0090e55801722",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "9d3be559476e4a60",
        "name": "",
        "x": 1340,
        "y": 6290,
        "wires": [
            [
                "fbfea06a274194c9"
            ]
        ]
    },
    {
        "id": "61f8f71b4fa369c7",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "c9012f7133f73aec",
        "name": "",
        "x": 1340,
        "y": 6500,
        "wires": [
            [
                "e90988c2747e2fed"
            ]
        ]
    },
    {
        "id": "fbcf7df33f78654d",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "540bf64309cf9240",
        "name": "",
        "x": 1390,
        "y": 1160,
        "wires": [
            [
                "092c41adbbb91218"
            ]
        ]
    },
    {
        "id": "91323d01f5730590",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "cda69f9f222991d1",
        "name": "",
        "x": 1390,
        "y": 1370,
        "wires": [
            [
                "6dddb69181f55cb6"
            ]
        ]
    },
    {
        "id": "fd4abfb53a803042",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "46dbb3906a5612cc",
        "name": "",
        "x": 1390,
        "y": 1580,
        "wires": [
            [
                "0dffc01579b9bbc2"
            ]
        ]
    },
    {
        "id": "f3ecd6cf585abc20",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "8d3ecbb3fac5881b",
        "name": "",
        "x": 1390,
        "y": 1790,
        "wires": [
            [
                "f7ba03d9bb3aaf33"
            ]
        ]
    },
    {
        "id": "051ef22d8ad711e3",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "660339caf1a0ce43",
        "name": "",
        "x": 1360,
        "y": 3190,
        "wires": [
            [
                "8719f6a0e145acce"
            ]
        ]
    },
    {
        "id": "885db9b738c487ad",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "0b21e7bb3132bbc3",
        "name": "",
        "x": 1390,
        "y": 2960,
        "wires": [
            [
                "d50282e04021b65d"
            ]
        ]
    },
    {
        "id": "99ce4aa3cfa81395",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "17608e879479a867",
        "name": "",
        "x": 1390,
        "y": 2420,
        "wires": [
            [
                "447c80caaecd8622"
            ]
        ]
    },
    {
        "id": "f85787c28386aff1",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "LPF3 PM 220",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"lp_f3\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 3610,
        "wires": [
            [
                "aa7001e73aba7e83"
            ]
        ]
    },
    {
        "id": "aa7001e73aba7e83",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f81aecda7db8768f",
        "name": "",
        "x": 1370,
        "y": 3610,
        "wires": [
            [
                "f906ede2d7a5ab5c"
            ]
        ]
    },
    {
        "id": "b52d187a718f6a3e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "KUB KWH TOTAL",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_kubikal (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 630,
        "y": 560,
        "wires": [
            [
                "75cd5d759e503c6d"
            ]
        ]
    },
    {
        "id": "75cd5d759e503c6d",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "66bbdf3188c2f96b",
        "name": "",
        "x": 930,
        "y": 560,
        "wires": [
            [
                "414c2f475fb2090c"
            ]
        ]
    },
    {
        "id": "f906ede2d7a5ab5c",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1590,
        "y": 3610,
        "wires": [
            [
                "8f5e4491775e7791"
            ]
        ]
    },
    {
        "id": "41b64c5ae622b48c",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 230,
        "y": 570,
        "wires": [
            [
                "93ed9ba9531bcee6"
            ]
        ]
    },
    {
        "id": "00c8f3d438bb9e57",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 230,
        "y": 600,
        "wires": [
            [
                "93ed9ba9531bcee6"
            ]
        ]
    },
    {
        "id": "f0b4f8efe950737b",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f81aecda7db8768f",
        "name": "",
        "x": 2010,
        "y": 3610,
        "wires": [
            []
        ]
    },
    {
        "id": "8f5e4491775e7791",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift LPF3 PM 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1790,
        "y": 3610,
        "wires": [
            [
                "f0b4f8efe950737b"
            ]
        ]
    },
    {
        "id": "a6723be91c9bed72",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "66bbdf3188c2f96b",
        "name": "",
        "x": 1520,
        "y": 560,
        "wires": [
            []
        ]
    },
    {
        "id": "414c2f475fb2090c",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift PM KUB",
        "func": "if (msg.payload && Array.isArray(msg.payload) && msg.payload.length > 0) {\n    var payload = msg.payload[0]; // Mengambil elemen pertama dari array payload\n\n    if (!payload.date_time) {\n        node.warn(\"date_time is missing in payload: \" + JSON.stringify(payload));\n        return null; // Stop execution if date_time is missing\n    }\n\n    var date_time = new Date(payload.date_time);\n    var power_meter = payload.power_meter;\n    var value = payload.value;\n    var shift;\n\n    var currentHour = date_time.getHours();\n    var currentMinute = date_time.getMinutes();\n    var currentDay = date_time.getDate();\n    var currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7);\n    var currentMonth = date_time.toLocaleString('default', { month: 'long' });\n    var currentYear = date_time.getFullYear();\n\n    if (power_meter === \"DA_01\") {\n        if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n            (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n            shift = \"shift_1\";\n        } else {\n            shift = \"shift_2\";\n        }\n\n        msg.topic = \"INSERT INTO tb_pershift_kub (power_meter, value, shift, day, week, month, year) \" +\n            \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n            \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n        return msg;\n    }\n} else {\n    // node.warn(\"msg.payload is not an array or is empty\");\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1190,
        "y": 560,
        "wires": [
            [
                "a6723be91c9bed72"
            ]
        ]
    },
    {
        "id": "b05d003511dcf2a5",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "if (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 4190,
        "wires": [
            [
                "44a12130eeddf2ee",
                "4f43b19b6006701b"
            ]
        ]
    },
    {
        "id": "a1211d101f5ca905",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 4400,
        "wires": [
            [
                "15cff76368851f19",
                "2e25910c7b58b355"
            ]
        ]
    },
    {
        "id": "ce20068a50d36975",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 4610,
        "wires": [
            [
                "8f880894e30e500b",
                "c72f355356ca3405"
            ]
        ]
    },
    {
        "id": "4f43b19b6006701b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR1 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 4220,
        "wires": [
            [
                "6ef708d6db8959ba"
            ]
        ]
    },
    {
        "id": "44a12130eeddf2ee",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR1 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 4190,
        "wires": [
            [
                "6ef708d6db8959ba"
            ]
        ]
    },
    {
        "id": "6ef708d6db8959ba",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f9015eda0438d8d1",
        "name": "",
        "x": 1970,
        "y": 4190,
        "wires": [
            []
        ]
    },
    {
        "id": "0774aea2e3f03347",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "d925402c7a20657e",
        "name": "",
        "x": 1970,
        "y": 4400,
        "wires": [
            []
        ]
    },
    {
        "id": "c3d604631f33d9c3",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "bce909d680d0bb39",
        "name": "",
        "x": 1970,
        "y": 4610,
        "wires": [
            []
        ]
    },
    {
        "id": "2e25910c7b58b355",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR2 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 4430,
        "wires": [
            [
                "0774aea2e3f03347"
            ]
        ]
    },
    {
        "id": "15cff76368851f19",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR2 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 4400,
        "wires": [
            [
                "0774aea2e3f03347"
            ]
        ]
    },
    {
        "id": "c72f355356ca3405",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR3 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 4640,
        "wires": [
            [
                "c3d604631f33d9c3"
            ]
        ]
    },
    {
        "id": "8f880894e30e500b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR3 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 4610,
        "wires": [
            [
                "c3d604631f33d9c3"
            ]
        ]
    },
    {
        "id": "8fe722b59c6f427d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 4820,
        "wires": [
            [
                "8bd12b4dfbc22d89",
                "84f571f70e2ca0f9"
            ]
        ]
    },
    {
        "id": "1a2c2c1a72286835",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 5030,
        "wires": [
            [
                "f5c68694ce2df826",
                "f1646158d76bcc37"
            ]
        ]
    },
    {
        "id": "345f9ec8f54e58df",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 5240,
        "wires": [
            [
                "ba66a48f673b894b",
                "faa98fe6965fd142"
            ]
        ]
    },
    {
        "id": "84f571f70e2ca0f9",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR4 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 4850,
        "wires": [
            [
                "a7c1dc70c99b5621"
            ]
        ]
    },
    {
        "id": "8bd12b4dfbc22d89",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR4 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 4820,
        "wires": [
            [
                "a7c1dc70c99b5621"
            ]
        ]
    },
    {
        "id": "a7c1dc70c99b5621",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "b2c30c30e281316c",
        "name": "",
        "x": 1970,
        "y": 4820,
        "wires": [
            []
        ]
    },
    {
        "id": "437f572fcf2132b1",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "e2a1621409270777",
        "name": "",
        "x": 1970,
        "y": 5030,
        "wires": [
            []
        ]
    },
    {
        "id": "124adb84571339c5",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f3e0e313401a2713",
        "name": "",
        "x": 1970,
        "y": 5240,
        "wires": [
            []
        ]
    },
    {
        "id": "f1646158d76bcc37",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR5 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5060,
        "wires": [
            [
                "437f572fcf2132b1"
            ]
        ]
    },
    {
        "id": "f5c68694ce2df826",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR5 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5030,
        "wires": [
            [
                "437f572fcf2132b1"
            ]
        ]
    },
    {
        "id": "faa98fe6965fd142",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR6 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5270,
        "wires": [
            [
                "124adb84571339c5"
            ]
        ]
    },
    {
        "id": "ba66a48f673b894b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR6 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5240,
        "wires": [
            [
                "124adb84571339c5"
            ]
        ]
    },
    {
        "id": "881a033878f3552b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 5450,
        "wires": [
            [
                "8dfb1e553c58a10f",
                "35668ce645fe7930"
            ]
        ]
    },
    {
        "id": "9d13b0b40a46c4d9",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 5660,
        "wires": [
            [
                "def3cdd73ebe9f69",
                "091b14aa6f9f07ac"
            ]
        ]
    },
    {
        "id": "f5a8a58f6beca575",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 5870,
        "wires": [
            [
                "50dbb9fec815cd92",
                "056fd59081f5d726"
            ]
        ]
    },
    {
        "id": "35668ce645fe7930",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR7 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5480,
        "wires": [
            [
                "5e1d4be914ea1d95"
            ]
        ]
    },
    {
        "id": "8dfb1e553c58a10f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR7 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5450,
        "wires": [
            [
                "5e1d4be914ea1d95"
            ]
        ]
    },
    {
        "id": "5e1d4be914ea1d95",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "05455fdbc2930db7",
        "name": "",
        "x": 1970,
        "y": 5450,
        "wires": [
            []
        ]
    },
    {
        "id": "8ff58c5decbd062e",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "64d9fc8d1d052290",
        "name": "",
        "x": 1970,
        "y": 5660,
        "wires": [
            []
        ]
    },
    {
        "id": "e64e7c60736c036a",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "670017ae691633be",
        "name": "",
        "x": 1970,
        "y": 5870,
        "wires": [
            []
        ]
    },
    {
        "id": "091b14aa6f9f07ac",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR8 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5690,
        "wires": [
            [
                "8ff58c5decbd062e"
            ]
        ]
    },
    {
        "id": "def3cdd73ebe9f69",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR8 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5660,
        "wires": [
            [
                "8ff58c5decbd062e"
            ]
        ]
    },
    {
        "id": "056fd59081f5d726",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR9 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5900,
        "wires": [
            [
                "e64e7c60736c036a"
            ]
        ]
    },
    {
        "id": "50dbb9fec815cd92",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR9 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 5870,
        "wires": [
            [
                "e64e7c60736c036a"
            ]
        ]
    },
    {
        "id": "8a5825829b8d9ae0",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 6080,
        "wires": [
            [
                "fa17033e63d079be",
                "569c6e70bf05e94d"
            ]
        ]
    },
    {
        "id": "fbfea06a274194c9",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 6290,
        "wires": [
            [
                "af14b092a97fdb94",
                "557d978cc1b3287f"
            ]
        ]
    },
    {
        "id": "e90988c2747e2fed",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 6500,
        "wires": [
            [
                "ee1f3815decc100b",
                "d345a4b166980c82"
            ]
        ]
    },
    {
        "id": "569c6e70bf05e94d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR10 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 6110,
        "wires": [
            [
                "dab89ae632db7228"
            ]
        ]
    },
    {
        "id": "fa17033e63d079be",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR10 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 6080,
        "wires": [
            [
                "dab89ae632db7228"
            ]
        ]
    },
    {
        "id": "dab89ae632db7228",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "1dc1f7d786abecba",
        "name": "",
        "x": 1980,
        "y": 6080,
        "wires": [
            []
        ]
    },
    {
        "id": "7bfbacd47ac83703",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "9d3be559476e4a60",
        "name": "",
        "x": 1980,
        "y": 6290,
        "wires": [
            []
        ]
    },
    {
        "id": "b42218c03508b2ee",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "c9012f7133f73aec",
        "name": "",
        "x": 1980,
        "y": 6500,
        "wires": [
            []
        ]
    },
    {
        "id": "557d978cc1b3287f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR11 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 6320,
        "wires": [
            [
                "7bfbacd47ac83703"
            ]
        ]
    },
    {
        "id": "af14b092a97fdb94",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR11 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 6290,
        "wires": [
            [
                "7bfbacd47ac83703"
            ]
        ]
    },
    {
        "id": "d345a4b166980c82",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR12 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 6530,
        "wires": [
            [
                "b42218c03508b2ee"
            ]
        ]
    },
    {
        "id": "ee1f3815decc100b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CR12 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 6500,
        "wires": [
            [
                "b42218c03508b2ee"
            ]
        ]
    },
    {
        "id": "6347726e1781f063",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 740,
        "wires": [
            [
                "95439434a7c66ab5",
                "cd5ba27d982ca8f6"
            ]
        ]
    },
    {
        "id": "cd5ba27d982ca8f6",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift Roller Arm 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1770,
        "y": 770,
        "wires": [
            [
                "53fdbccf479e8bf7"
            ]
        ]
    },
    {
        "id": "95439434a7c66ab5",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift  Roller Arm 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1770,
        "y": 740,
        "wires": [
            [
                "53fdbccf479e8bf7"
            ]
        ]
    },
    {
        "id": "53fdbccf479e8bf7",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "feb72a0a0524a815",
        "name": "",
        "x": 2000,
        "y": 740,
        "wires": [
            []
        ]
    },
    {
        "id": "092c41adbbb91218",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1600,
        "y": 1160,
        "wires": [
            [
                "1dddc8223e9dfa07",
                "7528df5bf04e4d5e"
            ]
        ]
    },
    {
        "id": "7528df5bf04e4d5e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift BS2 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1790,
        "y": 1190,
        "wires": [
            [
                "1db1b064a017bd3f"
            ]
        ]
    },
    {
        "id": "1dddc8223e9dfa07",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift BS2 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1790,
        "y": 1160,
        "wires": [
            [
                "1db1b064a017bd3f"
            ]
        ]
    },
    {
        "id": "6dddb69181f55cb6",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1600,
        "y": 1370,
        "wires": [
            [
                "50d1ae50a57f8a1d",
                "eb1588dc0de9c422"
            ]
        ]
    },
    {
        "id": "eb1588dc0de9c422",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift BS1 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1790,
        "y": 1400,
        "wires": [
            [
                "f54c30ab742e1405"
            ]
        ]
    },
    {
        "id": "50d1ae50a57f8a1d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift BS1 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1790,
        "y": 1370,
        "wires": [
            [
                "f54c30ab742e1405"
            ]
        ]
    },
    {
        "id": "0dffc01579b9bbc2",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1610,
        "y": 1580,
        "wires": [
            [
                "0843e643fd91fea9",
                "86a023eb4775d757"
            ]
        ]
    },
    {
        "id": "86a023eb4775d757",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHAB 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 1610,
        "wires": [
            [
                "08cbfcb4ff5470b4"
            ]
        ]
    },
    {
        "id": "0843e643fd91fea9",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHAB 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 1580,
        "wires": [
            [
                "08cbfcb4ff5470b4"
            ]
        ]
    },
    {
        "id": "f7ba03d9bb3aaf33",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1610,
        "y": 1790,
        "wires": [
            [
                "c1fc385f152126e0",
                "e6ae2fcb1c6602a4"
            ]
        ]
    },
    {
        "id": "e6ae2fcb1c6602a4",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHCD 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-1F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 1820,
        "wires": [
            [
                "ccc9ded19657b965"
            ]
        ]
    },
    {
        "id": "c1fc385f152126e0",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHCD 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-3F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 1790,
        "wires": [
            [
                "ccc9ded19657b965"
            ]
        ]
    },
    {
        "id": "447c80caaecd8622",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1610,
        "y": 2420,
        "wires": [
            [
                "8192d2c2da792bb6",
                "cc56e0831141970e"
            ]
        ]
    },
    {
        "id": "cc56e0831141970e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHSAC 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1810,
        "y": 2450,
        "wires": [
            [
                "c7e319375ad919e3"
            ]
        ]
    },
    {
        "id": "8192d2c2da792bb6",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHSAC 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1810,
        "y": 2420,
        "wires": [
            [
                "c7e319375ad919e3"
            ]
        ]
    },
    {
        "id": "d50282e04021b65d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1610,
        "y": 2980,
        "wires": [
            [
                "22d6a76f40a25c1b",
                "9fa9fd871fa91ada"
            ]
        ]
    },
    {
        "id": "9fa9fd871fa91ada",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHEF 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 3010,
        "wires": [
            [
                "5352c98c8a9d47c2"
            ]
        ]
    },
    {
        "id": "22d6a76f40a25c1b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHEF 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 2980,
        "wires": [
            [
                "5352c98c8a9d47c2"
            ]
        ]
    },
    {
        "id": "8719f6a0e145acce",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1610,
        "y": 3190,
        "wires": [
            [
                "74c6f38668d5f36f",
                "ddc0fe9e642c906a"
            ]
        ]
    },
    {
        "id": "ddc0fe9e642c906a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift RET 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 3220,
        "wires": [
            [
                "35d79cb546c08dd9"
            ]
        ]
    },
    {
        "id": "74c6f38668d5f36f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift RET 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 3190,
        "wires": [
            [
                "35d79cb546c08dd9"
            ]
        ]
    },
    {
        "id": "35d79cb546c08dd9",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "660339caf1a0ce43",
        "name": "",
        "x": 2000,
        "y": 3190,
        "wires": [
            []
        ]
    },
    {
        "id": "5352c98c8a9d47c2",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "0b21e7bb3132bbc3",
        "name": "",
        "x": 2030,
        "y": 2980,
        "wires": [
            []
        ]
    },
    {
        "id": "c7e319375ad919e3",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "17608e879479a867",
        "name": "",
        "x": 2050,
        "y": 2420,
        "wires": [
            []
        ]
    },
    {
        "id": "ccc9ded19657b965",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "8d3ecbb3fac5881b",
        "name": "",
        "x": 2030,
        "y": 1790,
        "wires": [
            []
        ]
    },
    {
        "id": "08cbfcb4ff5470b4",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "46dbb3906a5612cc",
        "name": "",
        "x": 2030,
        "y": 1580,
        "wires": [
            []
        ]
    },
    {
        "id": "f54c30ab742e1405",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "cda69f9f222991d1",
        "name": "",
        "x": 2020,
        "y": 1370,
        "wires": [
            []
        ]
    },
    {
        "id": "1db1b064a017bd3f",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "540bf64309cf9240",
        "name": "",
        "x": 2020,
        "y": 1160,
        "wires": [
            []
        ]
    },
    {
        "id": "ee2b6da7a4be1364",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Panel Energy_QG_CT",
        "func": "var array = msg.payload;\n\nif (array[0] === \"DP_QG_CT\") {\n    var sql = `INSERT INTO tb_panel_qg_ct (panel, code_power_meter, power_watt, energy_wh, current_a, voltage_v) \n                VALUES ('${array[0]}', '${array[1]}', '${array[2]}', '${array[3]}', '${array[4]}', '${array[5]}')`;\n\n    msg.topic = sql;\n    return msg;\n}else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1200,
        "y": 6930,
        "wires": [
            [
                "730d56e296c4799a"
            ]
        ]
    },
    {
        "id": "730d56e296c4799a",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f35783ccc307e2e9",
        "name": "",
        "x": 1430,
        "y": 6930,
        "wires": [
            [
                "82aef20c52853268"
            ]
        ]
    },
    {
        "id": "a7e9b7d51bd16fc3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift_kub",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\n\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n// Memastikan format SQL yang benar\nmsg.topic = `UPDATE tb_pershift_kub SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1220,
        "y": 650,
        "wires": [
            [
                "a6723be91c9bed72"
            ]
        ]
    },
    {
        "id": "9c8e4e3882034428",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 270,
        "y": 650,
        "wires": [
            [
                "a87bc84076ea1856"
            ]
        ]
    },
    {
        "id": "ea6a5a8bd30bbbe0",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 270,
        "y": 680,
        "wires": [
            [
                "a87bc84076ea1856"
            ]
        ]
    },
    {
        "id": "523324750156e4db",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "66bbdf3188c2f96b",
        "name": "",
        "x": 920,
        "y": 650,
        "wires": [
            [
                "a7e9b7d51bd16fc3"
            ]
        ]
    },
    {
        "id": "06cc5a2ce5a25c4c",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f81aecda7db8768f",
        "name": "",
        "x": 1370,
        "y": 3650,
        "wires": [
            [
                "3845d73f8e7dd8fb"
            ]
        ]
    },
    {
        "id": "3845d73f8e7dd8fb",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift pm220",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\n\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n// Memastikan format SQL yang benar\nmsg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1740,
        "y": 3650,
        "wires": [
            [
                "f0b4f8efe950737b"
            ]
        ]
    },
    {
        "id": "2908ab4ff81edff4",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f9015eda0438d8d1",
        "name": "",
        "x": 1350,
        "y": 4230,
        "wires": [
            [
                "31f5fbb9d2b41c5e"
            ]
        ]
    },
    {
        "id": "d7b29ea8bcf691b9",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "d925402c7a20657e",
        "name": "",
        "x": 1350,
        "y": 4440,
        "wires": [
            [
                "889c52d3313b61af"
            ]
        ]
    },
    {
        "id": "ac5a6865516b1fe6",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "bce909d680d0bb39",
        "name": "",
        "x": 1350,
        "y": 4650,
        "wires": [
            [
                "f8a571b9e1a8e2c3"
            ]
        ]
    },
    {
        "id": "6466c31341a79632",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "b2c30c30e281316c",
        "name": "",
        "x": 1350,
        "y": 4860,
        "wires": [
            [
                "46ec6011307bb0d2"
            ]
        ]
    },
    {
        "id": "a5963a3002ca2425",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "e2a1621409270777",
        "name": "",
        "x": 1350,
        "y": 5070,
        "wires": [
            [
                "76af6bb1892d2dcd"
            ]
        ]
    },
    {
        "id": "ec03fc8970616543",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "f3e0e313401a2713",
        "name": "",
        "x": 1350,
        "y": 5280,
        "wires": [
            [
                "72c863e0810c08c6"
            ]
        ]
    },
    {
        "id": "d440834a5b7cbbc8",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "05455fdbc2930db7",
        "name": "",
        "x": 1350,
        "y": 5490,
        "wires": [
            [
                "c7fa61a97c923626"
            ]
        ]
    },
    {
        "id": "ed250fddd02a60f1",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "64d9fc8d1d052290",
        "name": "",
        "x": 1350,
        "y": 5700,
        "wires": [
            [
                "8e64a3c823651b78"
            ]
        ]
    },
    {
        "id": "dffa2018214467d0",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "670017ae691633be",
        "name": "",
        "x": 1350,
        "y": 5910,
        "wires": [
            [
                "b5c49473526ac7ff"
            ]
        ]
    },
    {
        "id": "5516dabc94dee5c5",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "1dc1f7d786abecba",
        "name": "",
        "x": 1340,
        "y": 6120,
        "wires": [
            [
                "4f104e396f128d96"
            ]
        ]
    },
    {
        "id": "c2f0b0bb71e31b0b",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "9d3be559476e4a60",
        "name": "",
        "x": 1340,
        "y": 6330,
        "wires": [
            [
                "3fa97f39f7286bfc"
            ]
        ]
    },
    {
        "id": "aa7fe4216d08dc8b",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "c9012f7133f73aec",
        "name": "",
        "x": 1340,
        "y": 6540,
        "wires": [
            [
                "57945329add81e22"
            ]
        ]
    },
    {
        "id": "98ff24699c3b437b",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "feb72a0a0524a815",
        "name": "",
        "x": 1370,
        "y": 780,
        "wires": [
            [
                "d2e44fb9b6de1b76"
            ]
        ]
    },
    {
        "id": "08e1fd1b4a04c1f5",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "540bf64309cf9240",
        "name": "",
        "x": 1390,
        "y": 1200,
        "wires": [
            [
                "0b6e4e5e439ee208"
            ]
        ]
    },
    {
        "id": "2a818faa5e49a327",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "cda69f9f222991d1",
        "name": "",
        "x": 1390,
        "y": 1410,
        "wires": [
            [
                "015496b330ece476"
            ]
        ]
    },
    {
        "id": "845886127a6187a0",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "46dbb3906a5612cc",
        "name": "",
        "x": 1390,
        "y": 1620,
        "wires": [
            [
                "acfd567ec6036cf3"
            ]
        ]
    },
    {
        "id": "0e4dd347f043f867",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "8d3ecbb3fac5881b",
        "name": "",
        "x": 1390,
        "y": 1830,
        "wires": [
            [
                "4f598b2e3a8a35d8"
            ]
        ]
    },
    {
        "id": "69fb7eada7d6bcb0",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "17608e879479a867",
        "name": "",
        "x": 1390,
        "y": 2460,
        "wires": [
            [
                "c4388f483d16b570"
            ]
        ]
    },
    {
        "id": "c19c007fa50d94ac",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "0b21e7bb3132bbc3",
        "name": "",
        "x": 1400,
        "y": 3070,
        "wires": [
            [
                "bd1837ebf4fd7a7f"
            ]
        ]
    },
    {
        "id": "0be3795baa4669e8",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "660339caf1a0ce43",
        "name": "",
        "x": 1370,
        "y": 3260,
        "wires": [
            [
                "3eee06169ab64c09"
            ]
        ]
    },
    {
        "id": "31f5fbb9d2b41c5e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 4250,
        "wires": [
            [
                "6ef708d6db8959ba"
            ]
        ]
    },
    {
        "id": "889c52d3313b61af",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 4460,
        "wires": [
            [
                "0774aea2e3f03347"
            ]
        ]
    },
    {
        "id": "f8a571b9e1a8e2c3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 4670,
        "wires": [
            [
                "c3d604631f33d9c3"
            ]
        ]
    },
    {
        "id": "46ec6011307bb0d2",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 4880,
        "wires": [
            [
                "a7c1dc70c99b5621"
            ]
        ]
    },
    {
        "id": "76af6bb1892d2dcd",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 5090,
        "wires": [
            [
                "437f572fcf2132b1"
            ]
        ]
    },
    {
        "id": "72c863e0810c08c6",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 5300,
        "wires": [
            [
                "124adb84571339c5"
            ]
        ]
    },
    {
        "id": "c7fa61a97c923626",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 5510,
        "wires": [
            [
                "5e1d4be914ea1d95"
            ]
        ]
    },
    {
        "id": "8e64a3c823651b78",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 5720,
        "wires": [
            [
                "8ff58c5decbd062e"
            ]
        ]
    },
    {
        "id": "b5c49473526ac7ff",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 5930,
        "wires": [
            [
                "e64e7c60736c036a"
            ]
        ]
    },
    {
        "id": "4f104e396f128d96",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 6140,
        "wires": [
            [
                "dab89ae632db7228"
            ]
        ]
    },
    {
        "id": "3fa97f39f7286bfc",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 6350,
        "wires": [
            [
                "7bfbacd47ac83703"
            ]
        ]
    },
    {
        "id": "57945329add81e22",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 6560,
        "wires": [
            [
                "b42218c03508b2ee"
            ]
        ]
    },
    {
        "id": "d2e44fb9b6de1b76",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 800,
        "wires": [
            [
                "53fdbccf479e8bf7"
            ]
        ]
    },
    {
        "id": "3eee06169ab64c09",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1760,
        "y": 3250,
        "wires": [
            [
                "35d79cb546c08dd9"
            ]
        ]
    },
    {
        "id": "0b6e4e5e439ee208",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 1220,
        "wires": [
            [
                "1db1b064a017bd3f"
            ]
        ]
    },
    {
        "id": "015496b330ece476",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 1430,
        "wires": [
            [
                "f54c30ab742e1405"
            ]
        ]
    },
    {
        "id": "acfd567ec6036cf3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM-220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM-200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1760,
        "y": 1640,
        "wires": [
            [
                "08cbfcb4ff5470b4"
            ]
        ]
    },
    {
        "id": "4f598b2e3a8a35d8",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM-1F\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM-3F\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1760,
        "y": 1850,
        "wires": [
            [
                "ccc9ded19657b965"
            ]
        ]
    },
    {
        "id": "c4388f483d16b570",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1780,
        "y": 2480,
        "wires": [
            [
                "c7e319375ad919e3"
            ]
        ]
    },
    {
        "id": "bd1837ebf4fd7a7f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1760,
        "y": 3040,
        "wires": [
            [
                "5352c98c8a9d47c2"
            ]
        ]
    },
    {
        "id": "e53efb38cac7d555",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "KUB Active Power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 630,
        "y": 530,
        "wires": [
            [
                "75cd5d759e503c6d"
            ]
        ]
    },
    {
        "id": "9b482e66887bad8d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing SAA PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAA\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2000,
        "wires": [
            [
                "21e4dc4e23446af7"
            ]
        ]
    },
    {
        "id": "33e05d82e5ca172c",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing SAA PM200V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAA\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2030,
        "wires": [
            [
                "21e4dc4e23446af7"
            ]
        ]
    },
    {
        "id": "21e4dc4e23446af7",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "21c427d01695cbff",
        "name": "",
        "x": 1390,
        "y": 2000,
        "wires": [
            [
                "9901e296943033a4"
            ]
        ]
    },
    {
        "id": "440bd4f72652a236",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "21c427d01695cbff",
        "name": "",
        "x": 1390,
        "y": 2040,
        "wires": [
            [
                "d34cf6cf97660109"
            ]
        ]
    },
    {
        "id": "6b70f1e2a5fdb3bb",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "34031b27573f1658",
        "name": "",
        "x": 1390,
        "y": 2210,
        "wires": [
            [
                "674f6a3c3ac34a93"
            ]
        ]
    },
    {
        "id": "a80f22979967873d",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "34031b27573f1658",
        "name": "",
        "x": 1390,
        "y": 2250,
        "wires": [
            [
                "c3a07aa33890ece3"
            ]
        ]
    },
    {
        "id": "cb409db29024d507",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing SAB PM200V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAB\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2240,
        "wires": [
            [
                "6b70f1e2a5fdb3bb"
            ]
        ]
    },
    {
        "id": "569393eaeb556be7",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Camp Housing SAB PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAB\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2210,
        "wires": [
            [
                "6b70f1e2a5fdb3bb"
            ]
        ]
    },
    {
        "id": "9901e296943033a4",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1610,
        "y": 2000,
        "wires": [
            [
                "8b3ba9b458560510",
                "3246e63826150682"
            ]
        ]
    },
    {
        "id": "3246e63826150682",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHCD 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-1F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 2030,
        "wires": [
            [
                "b01781a304e62666"
            ]
        ]
    },
    {
        "id": "8b3ba9b458560510",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHCD 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-3F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 2000,
        "wires": [
            [
                "b01781a304e62666"
            ]
        ]
    },
    {
        "id": "d34cf6cf97660109",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1760,
        "y": 2060,
        "wires": [
            [
                "b01781a304e62666"
            ]
        ]
    },
    {
        "id": "674f6a3c3ac34a93",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1610,
        "y": 2210,
        "wires": [
            [
                "4b85def408e3e22b",
                "8807d03aeeceb02e"
            ]
        ]
    },
    {
        "id": "8807d03aeeceb02e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHCD 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-1F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 2240,
        "wires": [
            [
                "9b019a3d063e631e"
            ]
        ]
    },
    {
        "id": "4b85def408e3e22b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CHCD 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-3F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 2210,
        "wires": [
            [
                "9b019a3d063e631e"
            ]
        ]
    },
    {
        "id": "c3a07aa33890ece3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM-1F\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM-3F\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1760,
        "y": 2270,
        "wires": [
            [
                "9b019a3d063e631e"
            ]
        ]
    },
    {
        "id": "b01781a304e62666",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "21c427d01695cbff",
        "name": "",
        "x": 2030,
        "y": 2000,
        "wires": [
            []
        ]
    },
    {
        "id": "9b019a3d063e631e",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "34031b27573f1658",
        "name": "",
        "x": 2030,
        "y": 2210,
        "wires": [
            []
        ]
    },
    {
        "id": "070f11991df89b59",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CONNECTOR_pm220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CONN\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 3400,
        "wires": [
            [
                "1d660267ef4cca78"
            ]
        ]
    },
    {
        "id": "ef3c914f80fcd326",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "CONNECTOR_pm200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CONN\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n\n\n// *CONN,PM 200,22603780.00,#",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 3430,
        "wires": [
            [
                "1d660267ef4cca78"
            ]
        ]
    },
    {
        "id": "1d660267ef4cca78",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "72050355b6795d8a",
        "name": "",
        "x": 1390,
        "y": 3400,
        "wires": [
            [
                "38494cd0a80ba8a3"
            ]
        ]
    },
    {
        "id": "0aa5231f6624e737",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "72050355b6795d8a",
        "name": "",
        "x": 1390,
        "y": 3440,
        "wires": [
            [
                "ae5256c3e29f419e"
            ]
        ]
    },
    {
        "id": "38494cd0a80ba8a3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1610,
        "y": 3400,
        "wires": [
            [
                "6b64bbc16d7c8565",
                "a1e34eb115f6b398"
            ]
        ]
    },
    {
        "id": "a1e34eb115f6b398",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CONN 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 3430,
        "wires": [
            [
                "5a75987f4a5d9b8f"
            ]
        ]
    },
    {
        "id": "6b64bbc16d7c8565",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift CONN 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 3400,
        "wires": [
            [
                "5a75987f4a5d9b8f"
            ]
        ]
    },
    {
        "id": "ae5256c3e29f419e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1760,
        "y": 3460,
        "wires": [
            [
                "5a75987f4a5d9b8f"
            ]
        ]
    },
    {
        "id": "5a75987f4a5d9b8f",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "72050355b6795d8a",
        "name": "",
        "x": 2030,
        "y": 3400,
        "wires": [
            []
        ]
    },
    {
        "id": "64a791e008c193a7",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "5a612c42abe28d7c",
        "name": "",
        "x": 1370,
        "y": 950,
        "wires": [
            [
                "3b091d37673a094f"
            ]
        ]
    },
    {
        "id": "c9fa795fc0430a10",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "5a612c42abe28d7c",
        "name": "",
        "x": 1370,
        "y": 990,
        "wires": [
            [
                "471f3945d926d2a4"
            ]
        ]
    },
    {
        "id": "1e5a3be3b95e3931",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "HLA  ALL PM 200",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"HLA\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1130,
        "y": 950,
        "wires": [
            [
                "64a791e008c193a7"
            ]
        ]
    },
    {
        "id": "0d48f113df9cc2dc",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "HLA  ALL PM 220",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"HLA\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1130,
        "y": 980,
        "wires": [
            []
        ]
    },
    {
        "id": "98d42f3140c65f97",
        "type": "serial in",
        "z": "cacd99a553161a6b",
        "name": "",
        "serial": "2e997caa1e3410c9",
        "x": 110,
        "y": 80,
        "wires": [
            [
                "e42735596f862d9a",
                "4cc46f675e8a47ad",
                "3fc4e291d177259a",
                "a3af2c89e81392f6",
                "58cea9820cc4ac4c",
                "121dfa5c4ae2ff4a"
            ]
        ]
    },
    {
        "id": "4cc46f675e8a47ad",
        "type": "mqtt out",
        "z": "cacd99a553161a6b",
        "name": "",
        "topic": "topic_coreengine_server",
        "qos": "",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "5aa7e47a49afb254",
        "x": 330,
        "y": 90,
        "wires": []
    },
    {
        "id": "790e0a6074e932d3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 800,
        "wires": [
            [
                "ed48e5fada1e2003"
            ]
        ]
    },
    {
        "id": "f97de0f2739e3d7d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 830,
        "wires": [
            [
                "ed48e5fada1e2003"
            ]
        ]
    },
    {
        "id": "a87bc84076ea1856",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption kub",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_kub ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 630,
        "y": 650,
        "wires": [
            [
                "523324750156e4db"
            ]
        ]
    },
    {
        "id": "93ed9ba9531bcee6",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm kub",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_kubikal ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 590,
        "wires": [
            [
                "75cd5d759e503c6d"
            ]
        ]
    },
    {
        "id": "4f6278108065f046",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 860,
        "wires": [
            [
                "98ff24699c3b437b"
            ]
        ]
    },
    {
        "id": "f7abaa735817dc28",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 890,
        "wires": [
            [
                "98ff24699c3b437b"
            ]
        ]
    },
    {
        "id": "044bc5afe3637b35",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1010,
        "wires": [
            []
        ]
    },
    {
        "id": "c511304a3cf0f2ed",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1040,
        "wires": [
            [
                "64a791e008c193a7"
            ]
        ]
    },
    {
        "id": "1bf2285f68a5d81f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1070,
        "wires": [
            []
        ]
    },
    {
        "id": "32f5a91729ad9054",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1100,
        "wires": [
            [
                "c9fa795fc0430a10"
            ]
        ]
    },
    {
        "id": "ea6c7dbf6b537ba8",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1220,
        "wires": [
            [
                "fbcf7df33f78654d"
            ]
        ]
    },
    {
        "id": "60d81ea52722d13b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1250,
        "wires": [
            [
                "fbcf7df33f78654d"
            ]
        ]
    },
    {
        "id": "da3b19478c43f44b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1280,
        "wires": [
            [
                "08e1fd1b4a04c1f5"
            ]
        ]
    },
    {
        "id": "e2e7743d99002c90",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1310,
        "wires": [
            [
                "08e1fd1b4a04c1f5"
            ]
        ]
    },
    {
        "id": "9a6cf04970f4d62e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1430,
        "wires": [
            [
                "91323d01f5730590"
            ]
        ]
    },
    {
        "id": "472897c77b98d629",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1460,
        "wires": [
            [
                "91323d01f5730590"
            ]
        ]
    },
    {
        "id": "6cc1ee6737e74767",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1490,
        "wires": [
            [
                "2a818faa5e49a327"
            ]
        ]
    },
    {
        "id": "8cf05800e3655443",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1520,
        "wires": [
            [
                "2a818faa5e49a327"
            ]
        ]
    },
    {
        "id": "8ca691a08d0a3afd",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1640,
        "wires": [
            [
                "fd4abfb53a803042"
            ]
        ]
    },
    {
        "id": "2a5339643fd12c5a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1670,
        "wires": [
            [
                "fd4abfb53a803042"
            ]
        ]
    },
    {
        "id": "1c9924e3b9ae6597",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1700,
        "wires": [
            [
                "845886127a6187a0"
            ]
        ]
    },
    {
        "id": "029ca7878445ad87",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1730,
        "wires": [
            [
                "845886127a6187a0"
            ]
        ]
    },
    {
        "id": "62d0e50e1282c890",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1850,
        "wires": [
            [
                "f3ecd6cf585abc20"
            ]
        ]
    },
    {
        "id": "b14e8460dc71b518",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1880,
        "wires": [
            [
                "f3ecd6cf585abc20"
            ]
        ]
    },
    {
        "id": "1f9f62b6daac0536",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1910,
        "wires": [
            [
                "0e4dd347f043f867"
            ]
        ]
    },
    {
        "id": "8c41fe88845a28f1",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 1940,
        "wires": [
            [
                "0e4dd347f043f867"
            ]
        ]
    },
    {
        "id": "96178a6aed262108",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2060,
        "wires": [
            [
                "21e4dc4e23446af7"
            ]
        ]
    },
    {
        "id": "ddde18463770e922",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2090,
        "wires": [
            [
                "21e4dc4e23446af7"
            ]
        ]
    },
    {
        "id": "7e9919bf97312138",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2120,
        "wires": [
            [
                "440bd4f72652a236"
            ]
        ]
    },
    {
        "id": "9d289830095ad623",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2150,
        "wires": [
            [
                "440bd4f72652a236"
            ]
        ]
    },
    {
        "id": "e45e6f901453f825",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2270,
        "wires": [
            [
                "6b70f1e2a5fdb3bb"
            ]
        ]
    },
    {
        "id": "7e5212e507508850",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2300,
        "wires": [
            [
                "6b70f1e2a5fdb3bb"
            ]
        ]
    },
    {
        "id": "3bb5c4cb0f69bb77",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2330,
        "wires": [
            [
                "a80f22979967873d"
            ]
        ]
    },
    {
        "id": "b4a98e248dc05863",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2360,
        "wires": [
            [
                "a80f22979967873d"
            ]
        ]
    },
    {
        "id": "23b5b1f10b842025",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2480,
        "wires": [
            [
                "99ce4aa3cfa81395"
            ]
        ]
    },
    {
        "id": "495f990961efd163",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2510,
        "wires": [
            [
                "99ce4aa3cfa81395"
            ]
        ]
    },
    {
        "id": "e4e97c48acd4d1a9",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2540,
        "wires": [
            [
                "69fb7eada7d6bcb0"
            ]
        ]
    },
    {
        "id": "dfcd16b2bd475d83",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2570,
        "wires": [
            [
                "69fb7eada7d6bcb0"
            ]
        ]
    },
    {
        "id": "567dbdb9112fa4db",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3040,
        "wires": [
            [
                "885db9b738c487ad"
            ]
        ]
    },
    {
        "id": "b54c7be445b07030",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3070,
        "wires": [
            [
                "885db9b738c487ad"
            ]
        ]
    },
    {
        "id": "048a67607d4e6381",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3100,
        "wires": [
            [
                "c19c007fa50d94ac"
            ]
        ]
    },
    {
        "id": "a144bb83018efb4e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3130,
        "wires": [
            [
                "c19c007fa50d94ac"
            ]
        ]
    },
    {
        "id": "69d6d14169bb8c3b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3250,
        "wires": [
            [
                "051ef22d8ad711e3"
            ]
        ]
    },
    {
        "id": "ed67f85097a1bd01",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3280,
        "wires": [
            [
                "051ef22d8ad711e3"
            ]
        ]
    },
    {
        "id": "fd858dc37b47bbe0",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3310,
        "wires": [
            [
                "0be3795baa4669e8"
            ]
        ]
    },
    {
        "id": "68b454e92ef655fa",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3340,
        "wires": [
            [
                "0be3795baa4669e8"
            ]
        ]
    },
    {
        "id": "0f6315ef6bc870d9",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3460,
        "wires": [
            [
                "1d660267ef4cca78"
            ]
        ]
    },
    {
        "id": "58d2857af8b98aa3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3490,
        "wires": [
            []
        ]
    },
    {
        "id": "9090b518ace37977",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3520,
        "wires": [
            [
                "0aa5231f6624e737"
            ]
        ]
    },
    {
        "id": "062cc41c43c92f2a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3550,
        "wires": [
            []
        ]
    },
    {
        "id": "1be8a6c4b3e2333a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3640,
        "wires": [
            [
                "aa7001e73aba7e83"
            ]
        ]
    },
    {
        "id": "08b04e676bd7a82b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3670,
        "wires": [
            []
        ]
    },
    {
        "id": "12ca4f4c08c84eb1",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3700,
        "wires": [
            [
                "06cc5a2ce5a25c4c"
            ]
        ]
    },
    {
        "id": "24de48fd11bb5046",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3730,
        "wires": [
            []
        ]
    },
    {
        "id": "01a45bbb6ce273d2",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4250,
        "wires": [
            [
                "ce13aea86bd33580"
            ]
        ]
    },
    {
        "id": "d5925161cf7b7ce8",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4280,
        "wires": [
            [
                "ce13aea86bd33580"
            ]
        ]
    },
    {
        "id": "fb5733bebf5f6eee",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4310,
        "wires": [
            [
                "2908ab4ff81edff4"
            ]
        ]
    },
    {
        "id": "6ce513bc409f0583",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4340,
        "wires": [
            [
                "2908ab4ff81edff4"
            ]
        ]
    },
    {
        "id": "6dccfde234668712",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4460,
        "wires": [
            [
                "f5c96f250dd468b6"
            ]
        ]
    },
    {
        "id": "836637ec8c3eaa8b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4490,
        "wires": [
            [
                "f5c96f250dd468b6"
            ]
        ]
    },
    {
        "id": "3d7cb3721d00943e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4520,
        "wires": [
            [
                "d7b29ea8bcf691b9"
            ]
        ]
    },
    {
        "id": "657eadb86e870d13",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4550,
        "wires": [
            [
                "d7b29ea8bcf691b9"
            ]
        ]
    },
    {
        "id": "5998db2bbcf151b0",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4670,
        "wires": [
            [
                "3756db50d398c957"
            ]
        ]
    },
    {
        "id": "9ce08f329c5ebc28",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4700,
        "wires": [
            [
                "3756db50d398c957"
            ]
        ]
    },
    {
        "id": "b78b81497a32c14b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4730,
        "wires": [
            [
                "ac5a6865516b1fe6"
            ]
        ]
    },
    {
        "id": "5a341e31537f105e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4760,
        "wires": [
            [
                "ac5a6865516b1fe6"
            ]
        ]
    },
    {
        "id": "e483f20d7ddbfd8b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4880,
        "wires": [
            [
                "b976c771bfd3b926"
            ]
        ]
    },
    {
        "id": "14c501cb2ca4270c",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4910,
        "wires": [
            [
                "b976c771bfd3b926"
            ]
        ]
    },
    {
        "id": "1927bb9fdd85cd58",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4940,
        "wires": [
            [
                "6466c31341a79632"
            ]
        ]
    },
    {
        "id": "e06b9186502ff52a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 4970,
        "wires": [
            [
                "6466c31341a79632"
            ]
        ]
    },
    {
        "id": "a210e3316b8546a3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5090,
        "wires": [
            [
                "a5963a3002ca2425"
            ]
        ]
    },
    {
        "id": "497a3eab4206d141",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5120,
        "wires": [
            [
                "a5963a3002ca2425"
            ]
        ]
    },
    {
        "id": "5b8799b46317ef31",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5150,
        "wires": [
            [
                "a5963a3002ca2425"
            ]
        ]
    },
    {
        "id": "9d75e19c33729681",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5180,
        "wires": [
            [
                "a5963a3002ca2425"
            ]
        ]
    },
    {
        "id": "9eded1bfc79e3481",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5300,
        "wires": [
            [
                "a1b85940a46da258"
            ]
        ]
    },
    {
        "id": "abcee2c9af32f828",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5330,
        "wires": [
            [
                "a1b85940a46da258"
            ]
        ]
    },
    {
        "id": "148e34191ca0d658",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5360,
        "wires": [
            [
                "ec03fc8970616543"
            ]
        ]
    },
    {
        "id": "413dd8483c283cb9",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5390,
        "wires": [
            [
                "ec03fc8970616543"
            ]
        ]
    },
    {
        "id": "8915af35fd423e11",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5510,
        "wires": [
            [
                "f62ba98798e421dd"
            ]
        ]
    },
    {
        "id": "6df64e7a85d6bb06",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5540,
        "wires": [
            [
                "f62ba98798e421dd"
            ]
        ]
    },
    {
        "id": "6d8669f91538adad",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5570,
        "wires": [
            [
                "d440834a5b7cbbc8"
            ]
        ]
    },
    {
        "id": "ece75efb6c845f7f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5600,
        "wires": [
            [
                "d440834a5b7cbbc8"
            ]
        ]
    },
    {
        "id": "99db90d9a865231f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5720,
        "wires": [
            [
                "13978c8a032482a9"
            ]
        ]
    },
    {
        "id": "d1f730ad260704a3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5750,
        "wires": [
            [
                "13978c8a032482a9"
            ]
        ]
    },
    {
        "id": "7db48fa2b8bcfefb",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5780,
        "wires": [
            [
                "ed250fddd02a60f1"
            ]
        ]
    },
    {
        "id": "fca0490028dcc3ae",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5810,
        "wires": [
            [
                "ed250fddd02a60f1"
            ]
        ]
    },
    {
        "id": "b78f4f6a933a4290",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5930,
        "wires": [
            [
                "91e5c2a74d54df3a"
            ]
        ]
    },
    {
        "id": "5e9eb1d1da6d724b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5960,
        "wires": [
            [
                "91e5c2a74d54df3a"
            ]
        ]
    },
    {
        "id": "fccc40116e379fff",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 5990,
        "wires": [
            [
                "dffa2018214467d0"
            ]
        ]
    },
    {
        "id": "a7edb7c90d64752d",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6020,
        "wires": [
            [
                "dffa2018214467d0"
            ]
        ]
    },
    {
        "id": "4e7374b1d7a2cc86",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6140,
        "wires": [
            [
                "a009dd0d7035d950"
            ]
        ]
    },
    {
        "id": "78811f499ff58c2a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6170,
        "wires": [
            [
                "a009dd0d7035d950"
            ]
        ]
    },
    {
        "id": "49494cfa55d3d72f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6200,
        "wires": [
            [
                "5516dabc94dee5c5"
            ]
        ]
    },
    {
        "id": "8f0cbfd5d73d152b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6230,
        "wires": [
            [
                "5516dabc94dee5c5"
            ]
        ]
    },
    {
        "id": "b6206a3b6c9b58b3",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6350,
        "wires": [
            [
                "04a0090e55801722"
            ]
        ]
    },
    {
        "id": "154119c2907c5673",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6380,
        "wires": [
            [
                "04a0090e55801722"
            ]
        ]
    },
    {
        "id": "1d20eca28ca0e220",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6410,
        "wires": [
            [
                "c2f0b0bb71e31b0b"
            ]
        ]
    },
    {
        "id": "60e15cda22caa4fb",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6440,
        "wires": [
            [
                "c2f0b0bb71e31b0b"
            ]
        ]
    },
    {
        "id": "5c4cc852a7174062",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6560,
        "wires": [
            [
                "61f8f71b4fa369c7"
            ]
        ]
    },
    {
        "id": "d2a1d002ddba0a2b",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6590,
        "wires": [
            [
                "61f8f71b4fa369c7"
            ]
        ]
    },
    {
        "id": "ba738d370b293c61",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6620,
        "wires": [
            [
                "aa7fe4216d08dc8b"
            ]
        ]
    },
    {
        "id": "589190daad0a30da",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1080,
        "y": 6650,
        "wires": [
            [
                "aa7fe4216d08dc8b"
            ]
        ]
    },
    {
        "id": "bc8bcd33367b93a8",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 510,
        "y": 7100,
        "wires": [
            []
        ]
    },
    {
        "id": "8c3a69337bbc7486",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 510,
        "y": 7130,
        "wires": [
            []
        ]
    },
    {
        "id": "cf238f4dd2c5170e",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 510,
        "y": 7160,
        "wires": [
            []
        ]
    },
    {
        "id": "a809e26416fccc83",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 510,
        "y": 7190,
        "wires": [
            []
        ]
    },
    {
        "id": "8b631834576a43e3",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 860,
        "wires": [
            [
                "4f6278108065f046",
                "f7abaa735817dc28"
            ]
        ]
    },
    {
        "id": "4d8fda48b102553e",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 800,
        "wires": [
            [
                "790e0a6074e932d3",
                "f97de0f2739e3d7d"
            ]
        ]
    },
    {
        "id": "aa4fc67243b8935e",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 830,
        "wires": [
            [
                "790e0a6074e932d3",
                "f97de0f2739e3d7d"
            ]
        ]
    },
    {
        "id": "f72ecab3303469bb",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 890,
        "wires": [
            [
                "4f6278108065f046",
                "f7abaa735817dc28"
            ]
        ]
    },
    {
        "id": "6fa04eace1267d95",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1070,
        "wires": [
            [
                "1bf2285f68a5d81f",
                "32f5a91729ad9054"
            ]
        ]
    },
    {
        "id": "b86c73a17fdefbc4",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1010,
        "wires": [
            [
                "044bc5afe3637b35",
                "c511304a3cf0f2ed"
            ]
        ]
    },
    {
        "id": "baa538deda953da5",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1040,
        "wires": [
            [
                "044bc5afe3637b35",
                "c511304a3cf0f2ed"
            ]
        ]
    },
    {
        "id": "32867a7ad273cd8e",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1100,
        "wires": [
            [
                "1bf2285f68a5d81f",
                "32f5a91729ad9054"
            ]
        ]
    },
    {
        "id": "c1c60b39a726abbb",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1280,
        "wires": [
            [
                "da3b19478c43f44b",
                "e2e7743d99002c90"
            ]
        ]
    },
    {
        "id": "1163a602c8a3d9f1",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1220,
        "wires": [
            [
                "ea6c7dbf6b537ba8",
                "60d81ea52722d13b"
            ]
        ]
    },
    {
        "id": "0d813ce671c5426c",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1250,
        "wires": [
            [
                "ea6c7dbf6b537ba8",
                "60d81ea52722d13b"
            ]
        ]
    },
    {
        "id": "0bdfa86e6ff323e1",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1310,
        "wires": [
            [
                "da3b19478c43f44b",
                "e2e7743d99002c90"
            ]
        ]
    },
    {
        "id": "11562e53c925ae50",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1490,
        "wires": [
            [
                "6cc1ee6737e74767",
                "8cf05800e3655443"
            ]
        ]
    },
    {
        "id": "c2e20ee2f96d041d",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1430,
        "wires": [
            [
                "9a6cf04970f4d62e",
                "472897c77b98d629"
            ]
        ]
    },
    {
        "id": "015bd60a63181652",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1460,
        "wires": [
            [
                "9a6cf04970f4d62e",
                "472897c77b98d629"
            ]
        ]
    },
    {
        "id": "c3204f7691c07fb9",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1520,
        "wires": [
            [
                "6cc1ee6737e74767",
                "8cf05800e3655443"
            ]
        ]
    },
    {
        "id": "0ddaa14269f2fd5a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1700,
        "wires": [
            [
                "1c9924e3b9ae6597",
                "029ca7878445ad87"
            ]
        ]
    },
    {
        "id": "0288db9db387fd78",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1640,
        "wires": [
            [
                "8ca691a08d0a3afd",
                "2a5339643fd12c5a"
            ]
        ]
    },
    {
        "id": "5732bea83a2d4db6",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1670,
        "wires": [
            [
                "8ca691a08d0a3afd",
                "2a5339643fd12c5a"
            ]
        ]
    },
    {
        "id": "79bd36650b5178a0",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1730,
        "wires": [
            [
                "1c9924e3b9ae6597",
                "029ca7878445ad87"
            ]
        ]
    },
    {
        "id": "9f94e233b187f724",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1910,
        "wires": [
            [
                "1f9f62b6daac0536",
                "8c41fe88845a28f1"
            ]
        ]
    },
    {
        "id": "d0a59fb15dc27587",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1850,
        "wires": [
            [
                "62d0e50e1282c890",
                "b14e8460dc71b518"
            ]
        ]
    },
    {
        "id": "f1556cc86e88b66a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 1880,
        "wires": [
            [
                "62d0e50e1282c890",
                "b14e8460dc71b518"
            ]
        ]
    },
    {
        "id": "87b38a4d44d98767",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 1940,
        "wires": [
            [
                "1f9f62b6daac0536",
                "8c41fe88845a28f1"
            ]
        ]
    },
    {
        "id": "06130287175a7da7",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 2120,
        "wires": [
            [
                "7e9919bf97312138",
                "9d289830095ad623"
            ]
        ]
    },
    {
        "id": "2b6e94109625e5e0",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 2060,
        "wires": [
            [
                "96178a6aed262108",
                "ddde18463770e922"
            ]
        ]
    },
    {
        "id": "5c0d63061be99d04",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 2090,
        "wires": [
            [
                "96178a6aed262108",
                "ddde18463770e922"
            ]
        ]
    },
    {
        "id": "d258411dd21f06ea",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 2150,
        "wires": [
            [
                "7e9919bf97312138",
                "9d289830095ad623"
            ]
        ]
    },
    {
        "id": "21b8015b3f09d398",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 2330,
        "wires": [
            [
                "3bb5c4cb0f69bb77",
                "b4a98e248dc05863"
            ]
        ]
    },
    {
        "id": "77a267eccfc3f378",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 2270,
        "wires": [
            [
                "e45e6f901453f825",
                "7e5212e507508850"
            ]
        ]
    },
    {
        "id": "7360ed09fcf3a0e8",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 2300,
        "wires": [
            [
                "e45e6f901453f825",
                "7e5212e507508850"
            ]
        ]
    },
    {
        "id": "5a4f33416967f746",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 2360,
        "wires": [
            [
                "3bb5c4cb0f69bb77",
                "b4a98e248dc05863"
            ]
        ]
    },
    {
        "id": "65df1a8fb90dab5b",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 2540,
        "wires": [
            [
                "e4e97c48acd4d1a9",
                "dfcd16b2bd475d83"
            ]
        ]
    },
    {
        "id": "6b509bccb0a36aff",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 2480,
        "wires": [
            [
                "23b5b1f10b842025",
                "495f990961efd163"
            ]
        ]
    },
    {
        "id": "d9376c54eb4d3766",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 2510,
        "wires": [
            [
                "23b5b1f10b842025",
                "495f990961efd163"
            ]
        ]
    },
    {
        "id": "8d117274075b435b",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 2570,
        "wires": [
            [
                "e4e97c48acd4d1a9",
                "dfcd16b2bd475d83"
            ]
        ]
    },
    {
        "id": "64e85fa769fb86d1",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3100,
        "wires": [
            [
                "048a67607d4e6381",
                "a144bb83018efb4e"
            ]
        ]
    },
    {
        "id": "74f13726fecdcee1",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3040,
        "wires": [
            [
                "567dbdb9112fa4db",
                "b54c7be445b07030"
            ]
        ]
    },
    {
        "id": "252e2c012bf2390b",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3070,
        "wires": [
            [
                "567dbdb9112fa4db",
                "b54c7be445b07030"
            ]
        ]
    },
    {
        "id": "7ff5acf14d1f022f",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3130,
        "wires": [
            [
                "048a67607d4e6381",
                "a144bb83018efb4e"
            ]
        ]
    },
    {
        "id": "f899d6580162cb1a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3310,
        "wires": [
            [
                "fd858dc37b47bbe0",
                "68b454e92ef655fa"
            ]
        ]
    },
    {
        "id": "8cfcfe40f0fa0db1",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3250,
        "wires": [
            [
                "69d6d14169bb8c3b",
                "ed67f85097a1bd01"
            ]
        ]
    },
    {
        "id": "38630866b756b74f",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3280,
        "wires": [
            [
                "69d6d14169bb8c3b",
                "ed67f85097a1bd01"
            ]
        ]
    },
    {
        "id": "d5fcb391440ffc37",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3340,
        "wires": [
            [
                "fd858dc37b47bbe0",
                "68b454e92ef655fa"
            ]
        ]
    },
    {
        "id": "c7aff396228f7078",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3520,
        "wires": [
            [
                "9090b518ace37977",
                "062cc41c43c92f2a"
            ]
        ]
    },
    {
        "id": "338cf4367d636ee0",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3460,
        "wires": [
            [
                "0f6315ef6bc870d9",
                "58d2857af8b98aa3"
            ]
        ]
    },
    {
        "id": "5585648db3779000",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3490,
        "wires": [
            [
                "0f6315ef6bc870d9",
                "58d2857af8b98aa3"
            ]
        ]
    },
    {
        "id": "fb97b75e43d1b70a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3550,
        "wires": [
            [
                "9090b518ace37977",
                "062cc41c43c92f2a"
            ]
        ]
    },
    {
        "id": "67d851a4387dc08d",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3700,
        "wires": [
            [
                "12ca4f4c08c84eb1",
                "24de48fd11bb5046"
            ]
        ]
    },
    {
        "id": "d8418267f9c09995",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3640,
        "wires": [
            [
                "1be8a6c4b3e2333a",
                "08b04e676bd7a82b"
            ]
        ]
    },
    {
        "id": "c22b0a43a97b6140",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3670,
        "wires": [
            [
                "1be8a6c4b3e2333a",
                "08b04e676bd7a82b"
            ]
        ]
    },
    {
        "id": "d9d34db136c1ff4d",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3730,
        "wires": [
            [
                "12ca4f4c08c84eb1",
                "24de48fd11bb5046"
            ]
        ]
    },
    {
        "id": "26e0bab4f68b3cf0",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 4310,
        "wires": [
            [
                "fb5733bebf5f6eee",
                "6ce513bc409f0583"
            ]
        ]
    },
    {
        "id": "276baa030632db72",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4250,
        "wires": [
            [
                "01a45bbb6ce273d2",
                "d5925161cf7b7ce8"
            ]
        ]
    },
    {
        "id": "2c13ade3a0c72d9a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4280,
        "wires": [
            [
                "01a45bbb6ce273d2",
                "d5925161cf7b7ce8"
            ]
        ]
    },
    {
        "id": "9ef1dc0fd12f0a7e",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 4340,
        "wires": [
            [
                "fb5733bebf5f6eee",
                "6ce513bc409f0583"
            ]
        ]
    },
    {
        "id": "06bf92e684d481f3",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 4520,
        "wires": [
            [
                "3d7cb3721d00943e",
                "657eadb86e870d13"
            ]
        ]
    },
    {
        "id": "e673d7232e07b837",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4460,
        "wires": [
            [
                "6dccfde234668712",
                "836637ec8c3eaa8b"
            ]
        ]
    },
    {
        "id": "da21c487e670fdcb",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4490,
        "wires": [
            [
                "6dccfde234668712",
                "836637ec8c3eaa8b"
            ]
        ]
    },
    {
        "id": "02c674f2418a013c",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 4550,
        "wires": [
            [
                "3d7cb3721d00943e",
                "657eadb86e870d13"
            ]
        ]
    },
    {
        "id": "34f31160b920d955",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 4730,
        "wires": [
            [
                "b78b81497a32c14b",
                "5a341e31537f105e"
            ]
        ]
    },
    {
        "id": "c9a329d137818414",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4670,
        "wires": [
            [
                "5998db2bbcf151b0",
                "9ce08f329c5ebc28"
            ]
        ]
    },
    {
        "id": "df78382a3056a3cf",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4700,
        "wires": [
            [
                "5998db2bbcf151b0",
                "9ce08f329c5ebc28"
            ]
        ]
    },
    {
        "id": "cb7f0c6bb10d35ca",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 4760,
        "wires": [
            [
                "b78b81497a32c14b",
                "5a341e31537f105e"
            ]
        ]
    },
    {
        "id": "ca8d23e98b76a385",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 4940,
        "wires": [
            [
                "1927bb9fdd85cd58",
                "e06b9186502ff52a"
            ]
        ]
    },
    {
        "id": "e27ded6e29ffe4fd",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4880,
        "wires": [
            [
                "e483f20d7ddbfd8b",
                "14c501cb2ca4270c"
            ]
        ]
    },
    {
        "id": "d56f015fb991bd6a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4910,
        "wires": [
            [
                "e483f20d7ddbfd8b",
                "14c501cb2ca4270c"
            ]
        ]
    },
    {
        "id": "d49743e2b9942e61",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 4970,
        "wires": [
            [
                "1927bb9fdd85cd58",
                "e06b9186502ff52a"
            ]
        ]
    },
    {
        "id": "63dc66dfaf4ec726",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5150,
        "wires": [
            [
                "5b8799b46317ef31",
                "9d75e19c33729681"
            ]
        ]
    },
    {
        "id": "b02cc7cbeaaf5017",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5090,
        "wires": [
            [
                "a210e3316b8546a3",
                "497a3eab4206d141"
            ]
        ]
    },
    {
        "id": "646ef40d108bf245",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5120,
        "wires": [
            [
                "a210e3316b8546a3",
                "497a3eab4206d141"
            ]
        ]
    },
    {
        "id": "a9fe5cf2f9dd43a0",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5180,
        "wires": [
            [
                "5b8799b46317ef31",
                "9d75e19c33729681"
            ]
        ]
    },
    {
        "id": "1fe8046447fd716c",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5360,
        "wires": [
            [
                "148e34191ca0d658",
                "413dd8483c283cb9"
            ]
        ]
    },
    {
        "id": "12cf361ffac5c13e",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5300,
        "wires": [
            [
                "9eded1bfc79e3481",
                "abcee2c9af32f828"
            ]
        ]
    },
    {
        "id": "5bf919d4b1afe7f1",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5330,
        "wires": [
            [
                "9eded1bfc79e3481",
                "abcee2c9af32f828"
            ]
        ]
    },
    {
        "id": "dc3acd3a2847b88e",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5390,
        "wires": [
            [
                "148e34191ca0d658",
                "413dd8483c283cb9"
            ]
        ]
    },
    {
        "id": "01bb954dbc492683",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5570,
        "wires": [
            [
                "6d8669f91538adad",
                "ece75efb6c845f7f"
            ]
        ]
    },
    {
        "id": "cfce3c438a4cedcf",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5510,
        "wires": [
            [
                "8915af35fd423e11",
                "6df64e7a85d6bb06"
            ]
        ]
    },
    {
        "id": "9f4e98d8a7a4d527",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5540,
        "wires": [
            [
                "8915af35fd423e11",
                "6df64e7a85d6bb06"
            ]
        ]
    },
    {
        "id": "6c5b534f13e2b789",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5600,
        "wires": [
            [
                "6d8669f91538adad",
                "ece75efb6c845f7f"
            ]
        ]
    },
    {
        "id": "e2810ee7d9e5fec7",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5780,
        "wires": [
            [
                "7db48fa2b8bcfefb",
                "fca0490028dcc3ae"
            ]
        ]
    },
    {
        "id": "519e83ee571f42d2",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5720,
        "wires": [
            [
                "99db90d9a865231f",
                "d1f730ad260704a3"
            ]
        ]
    },
    {
        "id": "3573b2a4a0c9b79a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5750,
        "wires": [
            [
                "99db90d9a865231f",
                "d1f730ad260704a3"
            ]
        ]
    },
    {
        "id": "50bfb53a548fd128",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5810,
        "wires": [
            [
                "7db48fa2b8bcfefb",
                "fca0490028dcc3ae"
            ]
        ]
    },
    {
        "id": "9e0944cda63dc4d3",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 5990,
        "wires": [
            [
                "fccc40116e379fff",
                "a7edb7c90d64752d"
            ]
        ]
    },
    {
        "id": "7f29bdc0d2bdc53c",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5930,
        "wires": [
            [
                "b78f4f6a933a4290",
                "5e9eb1d1da6d724b"
            ]
        ]
    },
    {
        "id": "8277d5796a18052f",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5960,
        "wires": [
            [
                "b78f4f6a933a4290",
                "5e9eb1d1da6d724b"
            ]
        ]
    },
    {
        "id": "dbdf5d7fdfb1a6f7",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 6020,
        "wires": [
            [
                "fccc40116e379fff",
                "a7edb7c90d64752d"
            ]
        ]
    },
    {
        "id": "c40574885c6e78a3",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 6200,
        "wires": [
            [
                "49494cfa55d3d72f",
                "8f0cbfd5d73d152b"
            ]
        ]
    },
    {
        "id": "1838d36b8d7ccb15",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6140,
        "wires": [
            [
                "4e7374b1d7a2cc86",
                "78811f499ff58c2a"
            ]
        ]
    },
    {
        "id": "a5279dcf038deec4",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6170,
        "wires": [
            [
                "4e7374b1d7a2cc86",
                "78811f499ff58c2a"
            ]
        ]
    },
    {
        "id": "819d9abfd6bb7339",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 6230,
        "wires": [
            [
                "49494cfa55d3d72f",
                "8f0cbfd5d73d152b"
            ]
        ]
    },
    {
        "id": "7f7ba60d962bb35a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 6410,
        "wires": [
            [
                "1d20eca28ca0e220",
                "60e15cda22caa4fb"
            ]
        ]
    },
    {
        "id": "d42a7d2872a72858",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6350,
        "wires": [
            [
                "b6206a3b6c9b58b3",
                "154119c2907c5673"
            ]
        ]
    },
    {
        "id": "e65ef2aa0736d85a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6380,
        "wires": [
            [
                "b6206a3b6c9b58b3",
                "154119c2907c5673"
            ]
        ]
    },
    {
        "id": "f1211d65702d13cf",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 6440,
        "wires": [
            [
                "1d20eca28ca0e220",
                "60e15cda22caa4fb"
            ]
        ]
    },
    {
        "id": "1fd1523e502fa38a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 6620,
        "wires": [
            [
                "ba738d370b293c61",
                "589190daad0a30da"
            ]
        ]
    },
    {
        "id": "a7bb943c0a63bfab",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6560,
        "wires": [
            [
                "5c4cc852a7174062",
                "d2a1d002ddba0a2b"
            ]
        ]
    },
    {
        "id": "c835e100f7df987a",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6590,
        "wires": [
            [
                "5c4cc852a7174062",
                "d2a1d002ddba0a2b"
            ]
        ]
    },
    {
        "id": "eb97eba81a16f639",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 800,
        "y": 6650,
        "wires": [
            [
                "ba738d370b293c61",
                "589190daad0a30da"
            ]
        ]
    },
    {
        "id": "3fcd71db45717798",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 230,
        "y": 7160,
        "wires": [
            [
                "cf238f4dd2c5170e",
                "a809e26416fccc83"
            ]
        ]
    },
    {
        "id": "1340c27682ad32cf",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 180,
        "y": 7100,
        "wires": [
            [
                "bc8bcd33367b93a8",
                "8c3a69337bbc7486",
                "d04f9ebbe0c77c24"
            ]
        ]
    },
    {
        "id": "c68bc6b1de97c7ee",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 180,
        "y": 7130,
        "wires": [
            [
                "bc8bcd33367b93a8",
                "8c3a69337bbc7486",
                "d04f9ebbe0c77c24"
            ]
        ]
    },
    {
        "id": "379eca587de469f2",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 230,
        "y": 7190,
        "wires": [
            [
                "cf238f4dd2c5170e",
                "a809e26416fccc83"
            ]
        ]
    },
    {
        "id": "3b091d37673a094f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1600,
        "y": 950,
        "wires": [
            [
                "20a45109b862505a",
                "4f07cb43845521c5"
            ]
        ]
    },
    {
        "id": "4f07cb43845521c5",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift HLA 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1790,
        "y": 980,
        "wires": [
            [
                "78d7280aaf69ef6d"
            ]
        ]
    },
    {
        "id": "20a45109b862505a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift  HLA 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1790,
        "y": 950,
        "wires": [
            [
                "78d7280aaf69ef6d"
            ]
        ]
    },
    {
        "id": "78d7280aaf69ef6d",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "5a612c42abe28d7c",
        "name": "",
        "x": 2000,
        "y": 950,
        "wires": [
            []
        ]
    },
    {
        "id": "471f3945d926d2a4",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1750,
        "y": 1010,
        "wires": [
            [
                "78d7280aaf69ef6d"
            ]
        ]
    },
    {
        "id": "5803c441aa3b21cd",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "day",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "50 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 920,
        "wires": [
            []
        ]
    },
    {
        "id": "6052d56267bcde71",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "day",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "50 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 1130,
        "wires": [
            []
        ]
    },
    {
        "id": "f60c3e80d9b35ab1",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "day",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "50 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 1340,
        "wires": [
            []
        ]
    },
    {
        "id": "4e534e1ea557ccac",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "92ca5ec05848c8bf",
        "name": "",
        "x": 1450,
        "y": 7090,
        "wires": [
            [
                "209e5083cb10c389"
            ]
        ]
    },
    {
        "id": "a1db4b1c62159ca5",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200 1",
        "func": "msg.topic = \"SELECT * FROM tb_total_kwh_pm200 WHERE power_meter = 'PM_200_1' ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 7120,
        "wires": [
            [
                "4e534e1ea557ccac"
            ]
        ]
    },
    {
        "id": "893153770ea87dd2",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200 1",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200_1 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 7180,
        "wires": [
            [
                "b485c32680dcc347"
            ]
        ]
    },
    {
        "id": "701fbff3740e21e5",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 900,
        "y": 7180,
        "wires": [
            [
                "893153770ea87dd2",
                "b51877f350c2dc96"
            ]
        ]
    },
    {
        "id": "179719c4ae29df03",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "00 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 850,
        "y": 7120,
        "wires": [
            [
                "a1db4b1c62159ca5",
                "322a6b5ff1a09613"
            ]
        ]
    },
    {
        "id": "96268028f58ca6df",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "00 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 850,
        "y": 7150,
        "wires": [
            [
                "a1db4b1c62159ca5",
                "322a6b5ff1a09613"
            ]
        ]
    },
    {
        "id": "b599419a670b6f29",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 900,
        "y": 7210,
        "wires": [
            [
                "893153770ea87dd2",
                "b51877f350c2dc96"
            ]
        ]
    },
    {
        "id": "dfb516c4c5748765",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "W Eng ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1210,
        "y": 7090,
        "wires": [
            [
                "4e534e1ea557ccac"
            ]
        ]
    },
    {
        "id": "322a6b5ff1a09613",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200 2",
        "func": "msg.topic = \"SELECT * FROM tb_total_kwh_pm200 WHERE power_meter = 'PM_200_2' ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 7150,
        "wires": [
            [
                "4e534e1ea557ccac"
            ]
        ]
    },
    {
        "id": "209e5083cb10c389",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1670,
        "y": 7090,
        "wires": [
            [
                "6cae4a3cec9261cd",
                "da70596bb0e03166"
            ]
        ]
    },
    {
        "id": "6cae4a3cec9261cd",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift WEng 200 1",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200_1\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200_1 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1950,
        "y": 7090,
        "wires": [
            [
                "13ef0546538e63a1"
            ]
        ]
    },
    {
        "id": "da70596bb0e03166",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "PerShift WEng 200 2",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200_2\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200_2 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1950,
        "y": 7120,
        "wires": [
            [
                "13ef0546538e63a1"
            ]
        ]
    },
    {
        "id": "f668b05105c7faf5",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_200_1\"){\n    msg.topic = `UPDATE tb_pershift_pm200_1 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200_2\"){\n    msg.topic = `UPDATE tb_pershift_pm200_2 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1920,
        "y": 7150,
        "wires": [
            [
                "13ef0546538e63a1"
            ]
        ]
    },
    {
        "id": "82aef20c52853268",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Parse Data DP_QG_CT",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        power_watt: result.power_watt,\n        energy_wh: result.energy_wh,\n        current_a: result.current_a,\n        voltage_v: result.voltage_v\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1710,
        "y": 6930,
        "wires": [
            []
        ]
    },
    {
        "id": "d04f9ebbe0c77c24",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query QG_CT",
        "func": "msg.topic = \"SELECT * FROM tb_panel_qg_ct WHERE panel = 'DP_QG_CT' ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 6960,
        "wires": [
            [
                "730d56e296c4799a"
            ]
        ]
    },
    {
        "id": "13ef0546538e63a1",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "92ca5ec05848c8bf",
        "name": "",
        "x": 2210,
        "y": 7090,
        "wires": [
            []
        ]
    },
    {
        "id": "b485c32680dcc347",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "92ca5ec05848c8bf",
        "name": "",
        "x": 1450,
        "y": 7130,
        "wires": [
            [
                "f668b05105c7faf5"
            ]
        ]
    },
    {
        "id": "b51877f350c2dc96",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200 2",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200_2 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 7210,
        "wires": [
            [
                "b485c32680dcc347"
            ]
        ]
    },
    {
        "id": "3fc4e291d177259a",
        "type": "debug",
        "z": "cacd99a553161a6b",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 280,
        "y": 40,
        "wires": []
    },
    {
        "id": "0e75b1bfbb4fa673",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "dc56ad4eb0f6eef7",
        "name": "",
        "x": 1460,
        "y": 30,
        "wires": [
            []
        ]
    },
    {
        "id": "a152431516a4878a",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "6e2a71cd13bdf08b",
        "name": "",
        "x": 1450,
        "y": 80,
        "wires": [
            []
        ]
    },
    {
        "id": "58cea9820cc4ac4c",
        "type": "string",
        "z": "cacd99a553161a6b",
        "name": "hikitori",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": "^"
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 270,
        "y": 190,
        "wires": [
            [
                "49556903850fe0e5",
                "16ba0954368201e7"
            ]
        ]
    },
    {
        "id": "a3af2c89e81392f6",
        "type": "string",
        "z": "cacd99a553161a6b",
        "name": "montiv",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 270,
        "y": 150,
        "wires": [
            [
                "aea483507b70446a",
                "473819c182b42540"
            ]
        ]
    },
    {
        "id": "473819c182b42540",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.3\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 50,
        "wires": [
            [
                "0e75b1bfbb4fa673"
            ]
        ]
    },
    {
        "id": "16ba0954368201e7",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling = msg.payload[1];\nvar loading_time = msg.payload[2];\nvar status = msg.payload[3];\nvar cycle_normal = msg.payload[4];\nvar andon = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\nif (validHikitoriIds.includes(name_hikitori)) {\n    // Map to table name (HIKITORI F → hikitori_f)\n    var tableSuffix = name_hikitori.toLowerCase().split(' ')[1];\n    var specificTable = `hikitori_${tableSuffix}`;\n\n    // Common table insertion\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Individual table insertion - match your table structure\n    var specificQuery =\n        `INSERT INTO ${specificTable} \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Return both queries\n    return [\n        { topic: commonQuery },\n        { topic: specificQuery }\n    ];\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 90,
        "wires": [
            [
                "a152431516a4878a"
            ]
        ]
    },
    {
        "id": "6759118996cdac0b",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "1b0b8697b910c046",
        "name": "",
        "x": 1450,
        "y": 130,
        "wires": [
            []
        ]
    },
    {
        "id": "7686bc5b7a2de6f7",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "nais_energy",
        "func": "// Ambil payload\nvar panel = msg.payload[0];       // contoh: \"CR_7\"\nvar powerMeter = msg.payload[1];  // contoh: \"PM-220V\"\nvar value = parseFloat(msg.payload[2]); // konversi nilai ke float\n\n// Validasi input dasar\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\n// Daftar nilai minimal untuk setiap tabel (dalam WH)\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 25251044,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 189832192,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 0,\n    \"tb_pm200_ct\": 0,\n    \n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 492029536,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 51188,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    // \"tb_pm220_cc234\": 0,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 20145048,\n    \"tb_pm220_ct\": 0\n};\n\n// Waktu saat ini\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\n// Tentukan shift berdasarkan jam\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\n// Hitung minggu dalam bulan\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n// Cari nama tabel dinamis\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 130,
        "wires": [
            [
                "6759118996cdac0b"
            ]
        ]
    },
    {
        "id": "121dfa5c4ae2ff4a",
        "type": "string",
        "z": "cacd99a553161a6b",
        "name": "energy",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 270,
        "y": 230,
        "wires": [
            [
                "7686bc5b7a2de6f7",
                "bd419a2a1703c830",
                "3ff6e2361b1927dd",
                "5ea5bccb87c2a703",
                "3c8c8d03fb4f8032",
                "391a618ebb8f684a",
                "da9338fe98102304"
            ]
        ]
    },
    {
        "id": "bd419a2a1703c830",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_SAC\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 330,
        "y": 340,
        "wires": [
            [
                "94a523b4d4113fbc"
            ]
        ]
    },
    {
        "id": "94a523b4d4113fbc",
        "type": "string",
        "z": "cacd99a553161a6b",
        "name": "energy",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 600,
        "y": 240,
        "wires": [
            [
                "7686bc5b7a2de6f7"
            ]
        ]
    },
    {
        "id": "677a7bab739e4db8",
        "type": "debug",
        "z": "cacd99a553161a6b",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 710,
        "wires": []
    },
    {
        "id": "b6682940163158c9",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "16c3f1ddb8a5b3e2",
        "name": "",
        "x": 1370,
        "y": 3790,
        "wires": [
            []
        ]
    },
    {
        "id": "997284f841c6d086",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "fd2607531328f8e6",
        "name": "",
        "x": 1380,
        "y": 2630,
        "wires": [
            []
        ]
    },
    {
        "id": "f1704b4a24932ba6",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Cam Cap No1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CC1\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 3790,
        "wires": [
            [
                "b6682940163158c9"
            ]
        ]
    },
    {
        "id": "63e29a3eeea64dfd",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Cam Cap No 1",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CC1\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 3820,
        "wires": [
            [
                "b6682940163158c9"
            ]
        ]
    },
    {
        "id": "8ab2864aa87399e4",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3850,
        "wires": [
            [
                "b6682940163158c9"
            ]
        ]
    },
    {
        "id": "6f38220139d7e3ce",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3880,
        "wires": [
            [
                "b6682940163158c9"
            ]
        ]
    },
    {
        "id": "f4fb92da20a87fb6",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3910,
        "wires": [
            [
                "f4482aa6edc99a0c"
            ]
        ]
    },
    {
        "id": "a28868fd27ff4caf",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 3940,
        "wires": [
            [
                "f4482aa6edc99a0c"
            ]
        ]
    },
    {
        "id": "c885fe8010176620",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3910,
        "wires": [
            [
                "f4fb92da20a87fb6",
                "a28868fd27ff4caf"
            ]
        ]
    },
    {
        "id": "0627c947a5b02ac5",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3850,
        "wires": [
            [
                "8ab2864aa87399e4",
                "6f38220139d7e3ce"
            ]
        ]
    },
    {
        "id": "6327266e543bea69",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 3880,
        "wires": [
            [
                "8ab2864aa87399e4",
                "6f38220139d7e3ce"
            ]
        ]
    },
    {
        "id": "24a68b87608aec6f",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 3940,
        "wires": [
            [
                "f4fb92da20a87fb6",
                "a28868fd27ff4caf"
            ]
        ]
    },
    {
        "id": "f4482aa6edc99a0c",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "16c3f1ddb8a5b3e2",
        "name": "",
        "x": 1370,
        "y": 3830,
        "wires": [
            []
        ]
    },
    {
        "id": "46c33b74ae839be9",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Cam Cap No 234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CC234\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1070,
        "y": 2630,
        "wires": [
            [
                "997284f841c6d086"
            ]
        ]
    },
    {
        "id": "7a0d0d04abce52dc",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Cam Cap No 234",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CC234\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1070,
        "y": 2660,
        "wires": [
            [
                "997284f841c6d086"
            ]
        ]
    },
    {
        "id": "7d540a66dfcba85f",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2690,
        "wires": [
            [
                "997284f841c6d086"
            ]
        ]
    },
    {
        "id": "057e30c12d9a8167",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2720,
        "wires": [
            [
                "997284f841c6d086"
            ]
        ]
    },
    {
        "id": "3cd491bf626334f2",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2750,
        "wires": [
            [
                "ca8fcae9389caffe"
            ]
        ]
    },
    {
        "id": "bf98088b3136c3dc",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 2780,
        "wires": [
            [
                "ca8fcae9389caffe"
            ]
        ]
    },
    {
        "id": "e8a7c6da29c1b2fa",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 2750,
        "wires": [
            [
                "3cd491bf626334f2",
                "bf98088b3136c3dc"
            ]
        ]
    },
    {
        "id": "7db689d34287b17b",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 2690,
        "wires": [
            [
                "7d540a66dfcba85f",
                "057e30c12d9a8167"
            ]
        ]
    },
    {
        "id": "b94964f2a9ed2851",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 770,
        "y": 2720,
        "wires": [
            [
                "7d540a66dfcba85f",
                "057e30c12d9a8167"
            ]
        ]
    },
    {
        "id": "a9e1650a193c3a05",
        "type": "inject",
        "z": "cacd99a553161a6b",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 820,
        "y": 2780,
        "wires": [
            [
                "3cd491bf626334f2",
                "bf98088b3136c3dc"
            ]
        ]
    },
    {
        "id": "ca8fcae9389caffe",
        "type": "mysql",
        "z": "cacd99a553161a6b",
        "mydb": "fd2607531328f8e6",
        "name": "",
        "x": 1380,
        "y": 2670,
        "wires": [
            []
        ]
    },
    {
        "id": "3ff6e2361b1927dd",
        "type": "debug",
        "z": "cacd99a553161a6b",
        "name": "debug 7",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 410,
        "y": 220,
        "wires": []
    },
    {
        "id": "5ea5bccb87c2a703",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 320,
        "y": 370,
        "wires": [
            [
                "6759118996cdac0b"
            ]
        ]
    },
    {
        "id": "3c8c8d03fb4f8032",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 320,
        "y": 400,
        "wires": [
            [
                "6759118996cdac0b"
            ]
        ]
    },
    {
        "id": "49556903850fe0e5",
        "type": "debug",
        "z": "cacd99a553161a6b",
        "name": "debug 9",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 410,
        "y": 180,
        "wires": []
    },
    {
        "id": "aea483507b70446a",
        "type": "debug",
        "z": "cacd99a553161a6b",
        "name": "debug 10",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 410,
        "y": 140,
        "wires": []
    },
    {
        "id": "391a618ebb8f684a",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 330,
        "y": 430,
        "wires": [
            [
                "6759118996cdac0b"
            ]
        ]
    },
    {
        "id": "da9338fe98102304",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "W Eng ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 190,
        "wires": [
            [
                "6759118996cdac0b"
            ]
        ]
    },
    {
        "id": "eb052ee682167e26",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 380,
        "wires": [
            [
                "6759118996cdac0b"
            ]
        ]
    },
    {
        "id": "720bf3d756eff672",
        "type": "function",
        "z": "cacd99a553161a6b",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 420,
        "wires": [
            [
                "6759118996cdac0b"
            ]
        ]
    },
    {
        "id": "feb72a0a0524a815",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_roller_arm",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "f9015eda0438d8d1",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_1",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "d925402c7a20657e",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_2",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "bce909d680d0bb39",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_3",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "b2c30c30e281316c",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_4",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "e2a1621409270777",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_5",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "f3e0e313401a2713",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_6",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "05455fdbc2930db7",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_7",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "1dc1f7d786abecba",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_10",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "64d9fc8d1d052290",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_8",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "670017ae691633be",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_9",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "9d3be559476e4a60",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_11",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "c9012f7133f73aec",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_12",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "540bf64309cf9240",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_balance_shaft_1",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "cda69f9f222991d1",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_balance_shaft_2",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "46dbb3906a5612cc",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_ab",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "8d3ecbb3fac5881b",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_cd",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "660339caf1a0ce43",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_retainer",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "0b21e7bb3132bbc3",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_ef",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "17608e879479a867",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_sac",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "f81aecda7db8768f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_lpf3",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "66bbdf3188c2f96b",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_area_compressor",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "f35783ccc307e2e9",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_qg_ct",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "21c427d01695cbff",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_saa",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "34031b27573f1658",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_sab",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "72050355b6795d8a",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_connector",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "5a612c42abe28d7c",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_hla",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "2e997caa1e3410c9",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB0",
        "serialbaud": "9600",
        "databits": "8",
        "parity": "none",
        "stopbits": "1",
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "bin": "false",
        "out": "char",
        "addchar": "",
        "responsetimeout": "10000"
    },
    {
        "id": "5aa7e47a49afb254",
        "type": "mqtt-broker",
        "name": "",
        "broker": "192.168.41.185",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "92ca5ec05848c8bf",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_w_enginering",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "dc56ad4eb0f6eef7",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_produksi",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "6e2a71cd13bdf08b",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_hikitori",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "1b0b8697b910c046",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_energy",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "16c3f1ddb8a5b3e2",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_cam_cap_1",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "fd2607531328f8e6",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_cam_cap_234",
        "tz": "",
        "charset": "UTF8"
    }
]

// import { addTimer } from "../src/connects/dataConnect";

export const fnGetDay = () => {
    const day = new Date().getUTCDay();
    return day;
};

export const fnGetTime = () => {
    const t = new Date();
    const h = t.getHours();
    const m = t.getMinutes();
    const s = t.getSeconds();
    const tc = { hour: h, min: m, sec: s };
    return tc;
};

// Fn -> Pass to Seconds
export const fnGetSecs = (t) => {
    const secs = t.hour * 3600 + t.min * 60 + t.sec;
    return secs;
};

// Fn -> Create Object {hour, mint, sec}
export const fnMountTime = (secs) => {
    let h = Math.floor(secs / 60 / 60);
    let m = Math.floor(secs / 60) - h * 60;
    let s = Math.floor(secs % 60);
    const userTime = { hour: h, min: m, sec: s };
    return userTime;
};

// Media de Días

export const fnDayWeek = (days) => {
    const sum = fnSum(days);
    const half = sum / days.length;

    console.log(Math.floor(half), "|||||||||||||||||||||||||||||");
    switch (Math.floor(half)) {
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado";
        case 7:
            return "Domingo";
        default:
            console.log("No coincide ningún día");
    }
};

// Hora del día Media

export const fnHourDay = (hours) => {
    // Resultado
    let count = 0;
    let numWin = 0;

    for (let i = 1; i <= 24; i++) {
        // Las cuentas
        let countNum = 0;
        let num = i;

        hours.forEach((e) => {
            if (e == num) countNum++;
        });

        if (countNum >= count) {
            count = countNum;
            numWin = num;
        }
    }

    return numWin;
};

export const fnCalTime = (time) => {
    const id = time.id; // Id User
    let start = time.firstTime; // Tiempo Inicio
    let end = time.secondTime; // Tiempo End
    let hour = time.hour; // Hora

    const segStart = fnGetSecs(start);
    const segEnd = fnGetSecs(end);

    const totalSec = segEnd - segStart; // Total de seconds
    const day = fnGetDay(); // Día de hoy

    //   addTimer({ id: id, secs: totalSec, day: day, hour: hour }); // Envío los datos al back

    const mount = fnMountTime(totalSec);

    return mount;
};

// Media Tiempo

const fnSum = (time) => {
    return time.reduce((a, b) => a + b, 0);
};

export const fnSumTime = (time) => {
    let sum = fnSum(time);
    return fnMountTime(sum);
};

export const fnHalfTime = (time) => {
    let count = time.length;
    let sum = fnSum(time);
    let half = sum / count;

    let hTime = fnMountTime(half);
    return hTime;
};

// Timers of the World!

export const random = (num) => {
    return Math.floor(Math.random() * (num - 0)) + 0;
};

export const fnIntData = (time) => {
    const { hour, min, sec } = time;

    if (hour > 0) {
        return "más de una hora!";
    } else if (min > 0) {
        if (min < 2) {
            return timesLess1hour.less2[random(timesLess1hour.less2.length)];
        } else if (min < 5) {
            return timesLess1hour.less5[random(timesLess1hour.less5.length)];
        } else if (min < 15) {
            return timesLess1hour.less15[random(timesLess1hour.less15.length)];
        } else if (min < 30) {
            return timesLess1hour.less30[random(timesLess1hour.less30.length)];
        } else if (min < 60) {
            return timesLess1hour.less60[random(timesLess1hour.less60.length)];
        } else {
            console.log(
                "ASUASDASMLFASFM",
                timesLess1hour.less2[random(timesLess1hour.less2.length)]
            );
            return timesLess1hour.less2[random(timesLess1hour.less2.length)];
        }
    } else if (sec > 0) {
        if (sec < 10) {
            return timesLess1mint.less10[random(timesLess1mint.less10.length)];
        } else if (sec < 30) {
            return timesLess1mint.less30[random(timesLess1mint.less30.length)];
        } else if (sec < 50) {
            return timesLess1mint.less40[random(timesLess1mint.less40.length)];
        } else {
            return timesLess1mint.less60[random(timesLess1mint.less60.length)];
        }
    }
};

// Menos de 1 mint
const timesLess1mint = {
    less10: [
        `El récord de hacer girar la pelota sobre la nariz pertenece a "Scooter", Christense, de los Harlem Globetrotters. 7,7 segundos`,
        `Usain Bolt corrió los 100m en solo 9,58s`,
        `Jack Cai, tiene el récord de resolver el Cubo de Rubik en 16,22s... con los ojos cerrados.`,
    ],
    less30: [
        `Usain Bolt corrió los 200m en solo 19,19s`,
        `Christopher Irmscher tiene el récord de los 100m vallas... con aletas de buceo. 14,82s`,
        `Kenichi Ito, japonés que batió el récord de 100 metros liso corriendo a 4 patas. 18,58s`,
    ],
    less50: [
        `Lean Shutkever, de Reino Unidos, tiene el récord de comerse un burrito de 44,20s`,
        `Scott Murphy obstenta el récord de doblar una sartén de aluminio de 30cm a 17,46cm en 30s`,
    ],
    less60: [
        `David Rush tiene el prestigioso récord de quitar 70 calcetines en menos de un minuto`,
    ],
};

// Menos de 1 hora
const timesLess1hour = {
    less2: [
        `El Príncipe Harry y su mujer Meghan, tienen el récord del pérfil de instagram en alcanzar antes el millón de segudores. 5h:45m, 2899/mint.`,
        `Liza Thomas, un "barman" de Queensland (Australia), tiene el récord de preparar 420 capuchinos en una hora, 7 cada minuto`,
        `La tirolina más larga del mundo se encuentra en la montaña de Jebel Jaisen, al norte de los Emiratos. 2m y 2s de duración (150km/h)`,
    ],
    less5: [
        `Michael Phelps hizo los 400m estilos de natación en 4m y 3s (Récord Mundial)`,
        `El famoso salto de Felix Baumgartner desde el espacio con Red Bull Stratos, tuvo una caída libre de más de 4 minutos de duración.`,
    ],
    less15: [
        `Amancio Ortega gana 646,95€ cada minuto. Casi 10.000€ cada 15 minutos`,
    ],
    less30: [`El español Aleix segura, tiene el récord de apnea de ¡24m y 3s!`],
    less60: [
        `Wim Hoff tiene récord de tiempo enterrado en la nieve, desnudo. 42 min y 22s`,
    ],
};

// Más de 1 hora
const timeLess1hour = {
    less1: [
        `Wim Hoff tiene récord de tiempo enterrado en la nieve, desnudo. 42 min y 22s`,
    ],
};

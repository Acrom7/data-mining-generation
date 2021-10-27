export default function intervalToString(interval: IntervalT): string {
    const { from, to } = interval;

    if (from === to) {
        return from.toString(10);
    }

    return `[${from}, ${to}]`;
}

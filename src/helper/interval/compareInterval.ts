export default function compareInterval(interval1: IntervalT, interval2: IntervalT) {
    if (interval1.from === interval2.from && interval1.to === interval2.to) {
        return 'equal';
    }

    if (interval1.from >= interval2.from && interval1.to <= interval2.to) {
        return '1subsetOf2';
    }

    if (interval2.from >= interval1.from && interval2.to <= interval1.to) {
        return '2subsetOf1';
    }

    return 'unknown';
}

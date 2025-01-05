import faculties from '@/data/faculties.json';

export function getFacultyByAbbreviation(abbrev) {
    return faculties.find((faculty) => faculty.abbreviation === abbrev) || null;
}

export function getFacultiesByAbbreviations(abbreviations) {
    return abbreviations
        .map((abbr) => getFacultyByAbbreviation(abbr))
        .filter((faculty) => faculty !== null);
};
export const getSortOptionLabel = (
  sortOption: 'none' | 'asc' | 'desc' | 'dateAsc' | 'dateDesc',
): string => {
  switch (sortOption) {
    case 'none':
      return 'URUTKAN';
    case 'asc':
      return 'Nama A-Z';
    case 'desc':
      return 'Nama Z-A';
    case 'dateAsc':
      return 'Tanggal Terlama';
    case 'dateDesc':
      return 'Tanggal Terbaru';
    default:
      return ''; // This should never be reached due to TypeScript type checking
  }
};

export default getSortOptionLabel;

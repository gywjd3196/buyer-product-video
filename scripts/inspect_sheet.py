import json, re, zipfile, xml.etree.ElementTree as ET
from pathlib import Path

z = zipfile.ZipFile('/tmp/buyer-source.xlsx')
ns = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
strings = [''.join(x.itertext()) for x in ET.fromstring(z.read('xl/sharedStrings.xml'))]
book = ET.fromstring(z.read('xl/workbook.xml'))
all_sheets = []
for i, sheet in enumerate(book.find('m:sheets', ns), 1):
    root = ET.fromstring(z.read(f'xl/worksheets/sheet{i}.xml'))
    rows = []
    for row in root.findall('.//m:sheetData/m:row', ns):
        cells = {}
        for c in row:
            v = c.find('m:v', ns)
            value = v.text if v is not None else ''
            if c.get('t') == 's': value = strings[int(value)] if value else ''
            if c.get('t') == 'inlineStr': value = ''.join(c.find('m:is', ns).itertext())
            if value: cells[c.get('r')] = value
        if cells: rows.append(cells)
    data = {'name': sheet.get('name'), 'rows': rows}
    all_sheets.append(data)
    print('\nSHEET', i, data['name'], 'rows', len(rows))
    for row in rows[:8]: print(json.dumps(row, ensure_ascii=False))
    urls = [(k, v) for row in rows for k,v in row.items() if re.search(r'https?://', v)]
    print('URL CELLS', len(urls), json.dumps(urls[:3], ensure_ascii=False))
Path('/tmp/buyer-sheets.json').write_text(json.dumps(all_sheets, ensure_ascii=False, indent=2))

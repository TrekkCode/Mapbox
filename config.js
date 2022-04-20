'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/mapbox/light-v10',
  accessToken:
    'pk.eyJ1IjoiYWZhcm9yZyIsImEiOiJjbDIwajV3YTUwMGc3M2xwNDdiYWJiMjUzIn0.Pjt9AndPk1Axv99wez-5TA',
  CSV: 'https://docs.google.com/spreadsheets/d/1umfhXq5WEPLEABV81-tZUayAw7WZrmqe/gviz/tq?tqx=out:csv&sheet=Sheet1',
  center: [-121.9473, 36.8007],
  zoom: 6,
  title: 'Centers for Interactive Map',
  description:
    'Click "Show Filters" to filter by Program. Click "Reset Filter" to show all locations.',
  sideBarInfo: ['Name','Website'],
  popupInfo: ['Name'],
  popupInfo1: ['Website'],
  filters: [
    {
      type: 'checkbox',
      title: 'Programs: ',
      columnHeader: 'Program', // Case sensitive - must match spreadsheet entry
      listItems: ['Resource Centers for Minority Aging Research', 'Centers on the Demography and Economics of Aging', 'Nathan Shock Centers of Excellence in the Basic Biology of Aging', 'Claude D. Pepper Older Americans Independence Centers'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
  ],
};

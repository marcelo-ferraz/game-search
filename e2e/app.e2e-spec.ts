import { GamesSearchAppPage } from './app.po';

describe('games-search-app App', function() {
  let page: GamesSearchAppPage;

  beforeEach(() => {
    page = new GamesSearchAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

describe 'As I user I can', type: :feature do

  before do
    Capybara.app_host = "http://localhost:8080"
  end

  it 'visit the homepage' do
    visit "/"
    expect(page).to have_selector '#main'
  end
end

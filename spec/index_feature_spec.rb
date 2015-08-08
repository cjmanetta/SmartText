describe 'As I user I can', type: :feature do
  it 'visit the homepage and sign up' do
    Capybara.app_host = "http://localhost:8080"

    visit "/"
    expect(page).to have_selector '#main'
    expect(page).to have_selector "form#signUp"
    within "form#signUp" do
      fill_in 'first_name', with: 'Adam'
      fill_in 'last_name', with: 'Fluke'
      fill_in 'username', with: 'afluke'
      fill_in "password", with: 'abc123'
    end
    click_button 'Submit'
    expect(page).to have_selector '#main'
    expect(page).to_not have_selector "form#signUp"
    expect(page).to have_content "Question"
  end
end

# describe 'As I user I can', type: :feature do
#   it 'visit the homepage and log in' do
#     Capybara.app_host = "http://localhost:8080"

#     visit "/"
#     expect(page).to have_selector '#main'
#     expect(page).to have_selector "form#signUp"
#     within "form#signUp" do
#       fill_in 'first_name', with: 'Adam'
#       fill_in 'last_name', with: 'Fluke'
#       fill_in 'username', with: 'afluke'
#       fill_in "password", with: 'abc123'
#     end
#     click_button 'Submit'
#     expect(page).to have_selector '#main'
#     expect(page).to_not have_selector "form#signUp"
#     expect(page).to have_content "Adam"
#   end
# end

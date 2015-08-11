describe 'As a teacher user I can', type: :feature do
  it 'visit the homepage and sign up' do

    visit "/"
    p page.body
    expect(page).to have_selector '#main'
    expect(page).to have_selector "#authBox"
    click_link 'Teachers'
    expect(page).to have_selector '#teacherLoginForm'
    within "form#signUp" do
      fill_in 'first_name', with: 'Adam'
      fill_in 'last_name', with: 'Fluke'
      fill_in 'username', with: 'afluke'
      fill_in "password", with: 'abc123'
    end
    click_button 'Sign Up'
    expect(page).to have_selector '#main'
    expect(page).to_not have_selector "form#signUp"
    expect(page).to have_content "Welcome, Adam"
  end
end



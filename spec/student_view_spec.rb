describe 'As a student user I can', type: :feature do
  before(:each){
    visit "/"
    click_link 'Teachers'
    within "form#signUp" do
      fill_in 'first_name', with: 'Adam'
      fill_in 'last_name', with: 'Fluke'
      fill_in 'username', with: 'afluke123456789'
      fill_in "password", with: 'abc123'
    end
    click_button 'Sign Up'
    click_link 'Students Panel'
    within 'form#newKlass' do
      fill_in '5C - Second Period', with: "First Period"
      fill_in '5', with: "5"
      fill_in '1234', with: "5678"
    end
    click_button "Create Class"
    within 'form#newStudent' do
      fill_in 'sammysosa', with: "jackolope"
      fill_in 'Sammy', with: "Jack"
      fill_in 'S.', with: "O."
    end
    click_button "Create Student"
  }
  it 'sign in' do
    visit "/"
    click_link 'Students'
    within "form#studentLogIn" do
      fill_in "Username", with: "jackolope"
      fill_in "Pin", with: "5678"
    end
    click_button "Log In"
    expect(page).to have_selector "div#studentMain"
    expect(page).to have_selector 'div#rightBar'
    expect(page).to have_selector 'div#questionBox'
  end
end

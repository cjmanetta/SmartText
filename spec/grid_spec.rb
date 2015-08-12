describe 'As a teacher user I can, if signed in,', type: :feature do
  before(:each){
    visit "/"
    click_link 'Teachers'
    expect(page).to have_selector '#teacherLoginForm'
    within "form#teacherLoginForm" do
      fill_in 'username', with: 'jack222222229'
      fill_in "password", with: 'abc123'
    end
    click_button 'Log In'
  }
  it 'go to the lessons panel' do
    click_link 'Lessons Panel'
    expect(page).to have_selector '#lessonPanel'
  end
  context 'on the grid panel' do
    before(:each){
      click_link 'Lessons Panel'
    }
    it 'I can view the grid for my lesson' do
      click_link "New Lesson"
      expect(page).to have_selector '#newLesson'
      within 'form#newLesson' do
        fill_in 'Lesson Title', with: "Selecting Character Traits"
        fill_in 'MM/DD/YYYY', with: "12/18/2016"
      end
      click_button "Add Text"
      expect(page).to have_selector '#newArticle'

      within 'form#newArticle' do
        fill_in 'Text Title', with: "Silly Sammy Sosa"
        fill_in 'Author Name', with: "Silas Moore"
        fill_in 'Text Body', with: "Text text test text. Text text test text. Text text test text."
        fill_in 'Question', with: "Select the test?"
      end
      click_button 'Submit Text'

      expect(page).to have_selector "div#mainText"

      click_button 'Submit'

      expect(page).to have_content 'Selecting Character Traits'

      click_button 'Make Active Lesson'

      expect(page).to have_content 'Current Active Lesson:Selecting Character Traits'

      click_link 'Go to Lesson'

      expect(page).to have_content 'Teacher Dashboard'
      expect(page).to have_selector 'div#rightBar'
      expect(page).to have_selector 'div#questionBox'
      expect(page).to have_content 'Select the test?'
      expect(page).to_not have_selector 'form#EditLesson'

      click_link 'Lessons Panel'
      click_button 'Delete'
      expect(page).to_not have_content 'Selecting Character Traits'
    end
  end
end

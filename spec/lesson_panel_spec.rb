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
  context 'and on the students panel' do
    before(:each){
      click_link 'Lessons Panel'
    }
    it 'I can make a new lesson' do
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

      click_button 'Edit'

      within  'form#EditLesson' do
        fill_in 'Lesson Title', with: 'Sample Title'
        fill_in 'Lesson Date', with: '12/12/1212'
      end
      click_button 'Submit'

      expect(page).to have_content 'Sample Title'
      expect(page).to_not have_selector 'form#EditLesson'

      click_button 'Delete'

      expect(page).to_not have_content 'Sample Title'
    end
  end
end

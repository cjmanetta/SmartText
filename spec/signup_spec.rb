describe 'As a teacher user I can', type: :feature do
  it 'visit the homepage and sign up' do
    visit "/"
    expect(page).to have_selector '#main'
    expect(page).to have_selector "#authBox"
    click_link 'Teachers'
    expect(page).to have_selector '#teacherLoginForm'
    within "form#signUp" do
      fill_in 'first_name', with: 'Adam'
      fill_in 'last_name', with: 'Fluke'
      fill_in 'username', with: 'jack12345678'
      fill_in "password", with: 'abc123'
    end
    click_button 'Sign Up'
    expect(page).to have_selector '#main'
    expect(page).to_not have_selector "form#signUp"
    expect(page).to have_content "Welcome, Adam"
  end

  it 'visit the homepage and sign in' do
    visit "/"
    expect(page).to have_selector '#main'
    expect(page).to have_selector "#authBox"
    click_link 'Teachers'
    expect(page).to have_selector '#teacherLoginForm'
    within "form#teacherLoginForm" do
      fill_in 'username', with: 'jack12345678'
      fill_in "password", with: 'abc123'
    end
    click_button 'Log In'
    expect(page).to_not have_selector "form#signUp"
    expect(page).to have_content "Welcome, Adam"
  end
  context ',if I am signed in,' do
    before(:each){
      visit "/"
      click_link 'Teachers'
      expect(page).to have_selector '#teacherLoginForm'
      within "form#teacherLoginForm" do
        fill_in 'username', with: 'jack12345678'
        fill_in "password", with: 'abc123'
      end
      click_button 'Log In'
    }
    it 'log out' do
      click_link 'Log Out'
      expect(page).to have_selector '#main'
      expect(page).to have_selector "#authBox"
    end
    it 'go to the students panel' do
      click_link 'Students Panel'
      expect(page).to have_selector '#studentPanel'
    end
    it 'go to the lessons panel' do
      click_link 'Lessons Panel'
      expect(page).to have_selector '#lessonPanel'
    end
    context 'and on the students panel' do
      before(:each){
        click_link 'Students Panel'
      }
      it 'I can make a new klass' do
        within 'form#newKlass' do
          fill_in '5C - Second Period', with: "First Period"
          fill_in '5', with: "5"
          fill_in '1234', with: "5678"
        end
        click_button "Create Class"
        expect(page).to have_selector ".klassBox"
        expect(page).to have_content "First Period"
      end
      it 'I can edit a klass' do
        within 'div.klassBox' do
          click_button "Edit"
          within 'form#klassEdit' do
            fill_in '5C - Second Period', with: "Second Period"
            fill_in '5', with: "7"
            fill_in '1234', with: "5678"
          end
          click_button "Update Class"
        end
        expect(page).to have_selector ".klassBox"
        expect(page).to have_content "Second Period"
      end
      it 'I can delete a klass' do
        within 'div.klassBox' do
          click_button "Delete"
        end
        expect(page).to_not have_selector ".klassBox"
        expect(page).to_not have_content "Second Period"
      end
      context 'within a klass' do
        it 'I can add a student to a klass' do
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

          expect(page).to have_selector ".klassBox"
          expect(page).to have_selector "#studentsList"
          expect(page).to have_content "jackolope"
        end
        it 'I can edit a student' do
          within 'div#studentsList' do
            click_button "Edit"
            within 'form#studentEdit' do
              fill_in 'jackolope', with: "jackolopeStuffington"
              fill_in 'Jack', with: "Jack1"
              fill_in 'O.', with: "N."
            end
            click_button "Update Student"
          end
          expect(page).to have_selector ".klassBox"
          expect(page).to have_selector "#studentsList"
          expect(page).to have_content "jackolopeStuffington"
          expect(page).to have_content "Jack1"
          expect(page).to have_content "N."
        end
        it 'I can delete a student' do
          within 'div#studentsList' do
            click_button "Delete"
          end
          expect(page).to_not have_content "jackolopeStuffington"
          within 'div.klassBox' do
            click_button "Delete"
          end
        end
      end
    end
  end
end

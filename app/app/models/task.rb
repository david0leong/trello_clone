class Task < ApplicationRecord
  belongs_to :column

  acts_as_list scope: :column
end

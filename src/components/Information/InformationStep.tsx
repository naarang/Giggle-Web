import Input from '../Common/Input';
import { initialUserInfo, UserInfoRequestBody } from '@/types/api/users';
import { UserInfo } from '../../types/api/users';
import { useState } from 'react';
import { isValidFirstName } from '@/utils/information';

const InformationStep = ({
  userInfo,
  onNext,
}: {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
}) => {
  const [newUserInfo, setNewUserInfo] = useState<UserInfo>(initialUserInfo);
  const [invalidList, setInvalidList] = useState({
    firstName: false,
    lastName: false,
  });

  const checkFirstNameInvalid = () => {
    if (
      newUserInfo.first_name === undefined ||
      newUserInfo.first_name == '' ||
      !isValidFirstName(newUserInfo.first_name)
    ) {
      setInvalidList({ ...invalidList, firstName: true });
    }
  };

  const checkInvalidAll = () => {
    checkFirstNameInvalid();
    if (Object.values(invalidList).every((value) => value === true))
      onNext({ ...userInfo, user_info: newUserInfo });
  };
  return (
    <div>
      <div>
        <div>First Name</div>
        <Input
          inputType="INPUT"
          placeholder="First Name"
          value={newUserInfo.first_name}
          clearInvalid={() =>
            setInvalidList({ ...invalidList, firstName: false })
          }
          onChange={(value) =>
            setNewUserInfo({ ...newUserInfo, first_name: value })
          }
          canDelete={false}
          isInvalid={invalidList.firstName}
        />
      </div>
      <button onClick={checkInvalidAll}>Next</button>
    </div>
  );
};

export default InformationStep;

import useOption from './useOption';
import useOptionPost from './useOptionPost';

function useCompanyOption() {
  const { options } = useOption('/company/companyName/dropdown');
  return {
    company: options,
  };
}
function useCompanyAbbreviation() {
  const { options } = useOptionPost('/recruit/companies', {
    value: '',
  });
  return {
    companyShort: options,
  };
}
function useTabOption() {
  const { options } = useOption('/position/pc/tabType');
  return {
    tabs: options,
  };
}
function usePositionTypeOption() {
  const { options } = useOption('position/positionType');
  return {
    positionType: options,
  };
}
function useTypeOfWorkOption() {
  const { options } = useOption('position/typeOfWork');
  return {
    typeOfWork: options,
  };
}
function useStoreOption() {
  const { options } = useOptionPost('/store/authorized/inquiry', { value: '' });
  return {
    stores: options,
  };
}
function useStoreALLOption() {
  const { options } = useOptionPost('/store/authorized/inquiry', { value: '' });
  return {
    stores: options,
  };
}
function usePublicStoreOption() {
  const { options } = useOptionPost('/store/list', {
    value: '',
  });
  return {
    stores: options,
  };
}
function useAdminPublicStoreOption() {
  const { options } = useOptionPost('/store/authorized/inquiry', { value: '' });
  return {
    stores: options,
  };
}
function useRecruiterOption(storeId) {
  const { options } = useOptionPost(storeId ? `/store/${storeId}/clerks` : '', {
    value: '',
  });
  return {
    recruiter: options,
  };
}
function useSupplierOption() {
  const { options } = useOptionPost('/supplier/list/inquiry', {
    value: '',
  });
  return {
    supplier: options,
  };
}
function useNotBelongRecruiterOption(storeId) {
  const { options } = useOptionPost(
    storeId ? `/store/notBelong/${storeId}/recruiters` : '',
    { value: '' }
  );
  return {
    notBelongRecruiterList: options,
  };
}

function useUserListOption() {
  const { options } = useOption('/user/list');
  return {
    userList: options,
  };
}
function useRoleListOption() {
  const { options } = useOption('/role/list');
  return {
    roleList: options,
  };
}
function useCategoryOption() {
  const { options } = useOption('/black/characteristic/all');
  return {
    category: options,
  };
}

function useBelongStoreIdOption() {
  const { options } = useOptionPost('store/list/leader/inquiry', {
    value: '',
  });
  return {
    belongStoreId: options,
  };
}

function useMemberModeOption() {
  const { options } = useOptionPost('/memberMode/all/inquiry',{});
  return {
    memberMode: options,
  };
}

// 会员模式
function useMemberType() {
  const { options } = useOption('/memberMode/category');
  return {
    memberType: options,
  };
}
// 会员模式没有Renew
function useWithoutRenewMemberType() {
  const { options } = useOption('/memberMode/category/withoutRenew');
  return {
    withoutRenewMemberType: options,
  };
}
export default {
  useCompanyOption,
  useTabOption,
  usePositionTypeOption,
  useTypeOfWorkOption,
  useStoreOption,
  useUserListOption,
  useRoleListOption,
  useRecruiterOption,
  usePublicStoreOption,
  useCompanyAbbreviation,
  useCategoryOption,
  useSupplierOption,
  useStoreALLOption,
  useBelongStoreIdOption,
  useAdminPublicStoreOption,
  useNotBelongRecruiterOption,
  useMemberModeOption,
  useMemberType,
  useWithoutRenewMemberType,
};

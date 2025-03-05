import { Suspense } from "react";
import LoginLoading from "./content/loginLoading";
import SignInPageContent from "./content/pageContent";

const SignIn = () => {
  return (
    <Suspense fallback={<LoginLoading />}>
      <SignInPageContent />
    </Suspense>
  );
};

export default SignIn;

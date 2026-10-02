function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-10">
      <div className="flex justify-between">
        <ul>
          <h4 className="text-[#1A202C] text-[20px] font-bold">About</h4>
          <li className="text-[#90A3BF]">How it works</li>
          <li className="text-[#90A3BF]">Featured</li>
          <li className="text-[#90A3BF]">Partnership</li>
        </ul>
        <ul>
          <h4 className="text-[#1A202C] text-[20px] font-bold">Social</h4>
          <li className="text-[#90A3BF]">instagram</li>
          <li className="text-[#90A3BF]">facebook</li>
          <li className="text-[#90A3BF]">discord</li>
        </ul>
      </div>
      <div className="flex justify-between">
        <h5 className="text-[#1A202C] text-[13px] font-bold">Privacy Policy</h5>
        <h5 className="text-[#1A202C] text-[13px] font-bold">
          Terms & Conditions
        </h5>
      </div>
      <p className="text-[#1A202C] text-[14px] text-center font-semibold">
        ©2026 Brand. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;

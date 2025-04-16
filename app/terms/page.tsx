export default function Terms() {
  return (
    <>
      {/* Green bar behind navbar */}
      <div className="bg-edge-green-dark h-32"></div>
      
      <main className="flex-1 pt-6 md:pt-10 pb-12 md:pb-16">
        <div className="container mx-auto px-4 py-2">
          {/* Breadcrumbs could be added here */}
        </div>
        
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-edge-green-dark">Terms and Conditions</h1>
          <div className="border-b border-gray-300 pb-4 mb-6">
            <p className="text-gray-600">Last Updated: April 15, 2025</p>
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-edge-green-dark mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-800">By accessing or using the Elmvale District Garden Enthusiast (EDGE) website at https://edge-web-green.vercel.app/ (&quot;Website&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree with these Terms, please refrain from using our Website.</p>
            </section>
            
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-edge-green-dark mb-3">2. Disclaimer of Warranties</h2>
              <p className="text-gray-800 mb-2">EDGE hereby disclaims all warranties and representations regarding this Website. Specifically, you understand and agree that EDGE:</p>
              <ul className="list-disc pl-8 space-y-1 text-gray-800">
                <li>Shall not be liable for any profit, loss, or outcome resulting from information provided on this Website;</li>
                <li>Does not guarantee the accuracy, completeness, validity, or timeliness of information presented by EDGE or any third parties; and</li>
                <li>Bears no responsibility for materials posted by EDGE or any third party.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-edge-green-dark mb-3">3. User Responsibilities</h2>
              <p className="text-gray-800">Users are expected to exercise independent judgment, caution, and common sense when evaluating gardening methods, plant recommendations, or other information provided by EDGE or any third party. All gardening advice should be considered general information and may require adaptation to specific circumstances.</p>
            </section>
            
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-edge-green-dark mb-3">4. Limitation of Liability</h2>
              <p className="text-gray-800 mb-2">Users bear sole responsibility for backing up and securing any content they provide. EDGE assumes no responsibility for data or information loss under any circumstances.</p>
              
              <p className="text-gray-800 mb-2">In no event shall EDGE, its website designer, directors, volunteers, members, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential or exemplary damages, including without limitation:</p>
              
              <ul className="list-disc pl-8 space-y-1 text-gray-800">
                <li>Damages resulting from Website access, use, or inability to access or use;</li>
                <li>Damages arising from third-party conduct or content;</li>
                <li>Damages related to content obtained through the Website;</li>
                <li>Damages from unauthorized access, use, or alteration of user transmissions or content, regardless of any negligence by EDGE; and</li>
                <li>Any intellectual property concerns regarding logos, images, or content, which remain the property of their respective owners.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-edge-green-dark mb-3">5. Non-Profit Educational Purpose</h2>
              <p className="text-gray-800">EDGE operates as a non-profit community organization providing this Website for informational and educational purposes only. All gardening advice, plant care instructions, and event information are offered in good faith but should be verified through additional sources and adapted to local conditions.</p>
            </section>
            
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-edge-green-dark mb-3">6. Third-Party References</h2>
              <p className="text-gray-800">EDGE may occasionally reference local businesses, nurseries, or suppliers as a service to our members. Such references do not constitute endorsements, and EDGE receives no compensation for these mentions. Users should conduct their own due diligence regarding any third-party businesses or services.</p>
            </section>
            
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-edge-green-dark mb-3">7. Intellectual Property Rights</h2>
              <p className="text-gray-800">All content on this Website is the intellectual property of Elmvale District Garden Enthusiast (EDGE) unless explicitly noted otherwise. Unauthorized reproduction, distribution, or use of this content is prohibited without prior written permission from EDGE.</p>
            </section>
            
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-edge-green-dark mb-3">8. Modifications to Terms</h2>
              <p className="text-gray-800">EDGE reserves the right to modify these Terms at any time without prior notice. Any changes will be effective immediately upon posting to the Website. Users are responsible for regularly reviewing these Terms to stay informed of updates. Continued use of the Website following any modifications constitutes acceptance of the revised Terms.</p>
            </section>
            
            <div className="border-t border-gray-300 mt-8 pt-6">
              <p className="text-sm text-gray-600 italic">By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
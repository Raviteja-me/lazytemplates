import { BaseForm } from "components/ResumeForm/Form";
import { InputGroupWrapper } from "components/ResumeForm/Form/InputGroup";
import { THEME_COLORS } from "components/ResumeForm/ThemeForm/constants";
import { InlineInput } from "components/ResumeForm/ThemeForm/InlineInput";
import {
  DocumentSizeSelections,
  FontFamilySelectionsCSR,
  FontSizeSelections,
} from "components/ResumeForm/ThemeForm/Selection";
import {
  changeSettings,
  DEFAULT_THEME_COLOR,
  selectSettings,
  type GeneralSetting,
  changeTemplate,
} from "lib/redux/settingsSlice";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import type { FontFamily } from "components/fonts/constants";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const { fontSize, fontFamily, documentSize } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
  const dispatch = useAppDispatch();

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };

  return (
    <BaseForm>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 mb-2">
          <Cog6ToothIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          <h1 className="text-lg font-semibold tracking-wide text-gray-900">
            Resume Settings
          </h1>
        </div>
        
        {/* Template Selection - Moved to the top */}
        <div className="resume-section">
          <h2 className="text-md font-medium mb-3 text-gray-800">Template Selection</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              className={`px-4 py-2 rounded-md border ${settings.template === "classic" ? "bg-gray-700 text-white border-gray-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"} transition-colors`}
              onClick={() => dispatch(changeTemplate("classic"))}
            >
              Classic
            </button>
            <button
              className={`px-4 py-2 rounded-md border ${settings.template === "modern" ? "bg-gray-700 text-white border-gray-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"} transition-colors`}
              onClick={() => dispatch(changeTemplate("modern"))}
            >
              Modern
            </button>
            <button
              className={`px-4 py-2 rounded-md border ${settings.template === "minimal" ? "bg-gray-700 text-white border-gray-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"} transition-colors`}
              onClick={() => dispatch(changeTemplate("minimal"))}
            >
              Minimal
            </button>
            <button
              className={`px-4 py-2 rounded-md border ${settings.template === "professional" ? "bg-gray-700 text-white border-gray-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"} transition-colors`}
              onClick={() => dispatch(changeTemplate("professional"))}
            >
              Professional
            </button>
            <button
              className={`px-4 py-2 rounded-md border ${settings.template === "elegant" ? "bg-gray-700 text-white border-gray-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"} transition-colors`}
              onClick={() => dispatch(changeTemplate("elegant"))}
            >
              Elegant
            </button>
            <button
              className={`px-4 py-2 rounded-md border ${settings.template === "decor" ? "bg-gray-700 text-white border-gray-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"} transition-colors`}
              onClick={() => dispatch(changeTemplate("decor"))}
            >
              Decor
            </button>
            <button
              className={`px-4 py-2 rounded-md border ${settings.template === "blackmagic" ? "bg-gray-700 text-white border-gray-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"} transition-colors`}
              onClick={() => dispatch(changeTemplate("blackmagic"))}
            >
              Blackmagic
            </button>
            <button
              className={`px-4 py-2 rounded-md border ${settings.template === "standard" ? "bg-gray-700 text-white border-gray-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"} transition-colors`}
              onClick={() => dispatch(changeTemplate("standard"))}
            >
              Standard
            </button>
          </div>
        </div>
        
        {/* Color & Typography Section */}
        <div className="resume-section">
          <h2 className="text-md font-medium mb-3 text-gray-800">Color & Typography</h2>
          <div className="mb-4">
            <InlineInput
              label="Theme Color"
              name="themeColor"
              value={settings.themeColor}
              placeholder={DEFAULT_THEME_COLOR}
              onChange={handleSettingsChange}
              inputStyle={{ color: themeColor }}
            />
            {/* Improved color selection with circular buttons and better visual feedback */}
            <div className="mt-3 flex flex-wrap gap-3">
              {THEME_COLORS.map((color, idx) => (
                <div
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-sm transition-all ${settings.themeColor === color ? 'ring-2 ring-offset-2 ring-gray-700 scale-110' : 'hover:scale-105'}`}
                  style={{ backgroundColor: color }}
                  key={idx}
                  onClick={() => handleSettingsChange("themeColor", color)}
                  onKeyDown={(e) => {
                    if (["Enter", " "].includes(e.key))
                      handleSettingsChange("themeColor", color);
                  }}
                  tabIndex={0}
                  title={`Color ${idx+1}`}
                >
                  {settings.themeColor === color ? (
                    <span className="text-white text-lg">✓</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          
          {/* Font Family Selection */}
          <div className="mb-4">
            <InputGroupWrapper label="Font Family" />
            <FontFamilySelectionsCSR
              selectedFontFamily={fontFamily}
              themeColor={themeColor}
              handleSettingsChange={handleSettingsChange}
            />
          </div>
          
          {/* Font Size Selection */}
          <div>
            <InlineInput
              label="Font Size (pt)"
              name="fontSize"
              value={fontSize}
              placeholder="11"
              onChange={handleSettingsChange}
            />
            <FontSizeSelections
              fontFamily={fontFamily as FontFamily}
              themeColor={themeColor}
              selectedFontSize={fontSize}
              handleSettingsChange={handleSettingsChange}
            />
          </div>
        </div>
        
        {/* Document Properties Section */}
        <div className="resume-section">
          <h2 className="text-md font-medium mb-3 text-gray-800">Document Properties</h2>
          <InputGroupWrapper label="Document Size" />
          <DocumentSizeSelections
            themeColor={themeColor}
            selectedDocumentSize={documentSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </BaseForm>
  );
};

import type { ReactNode } from "react";
import { useState } from "react";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Typography as MuiTypography,
  TextField as MuiTextField,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  RadioGroup as MuiRadioGroupBase,
  FormControlLabel as MuiFormControlLabel,
  Radio as MuiRadio,
  Divider as MuiDivider,
  Link as MuiLink,
  Box as MuiBox 
} from '@mui/material'
import { Button, Card, Dialog, TextField, PhoneField, OTPInput, Stepper, RadioGroup, Typography, Divider, Box } from '../../src'
import type { DialogType } from '../../src'
import { VariantButtonDisabled} from '../../src/components/Button/VariantButtonDisabled'
import { VariantButtonOutlined } from '../../src/components/Button/VariantButtonOutlined'
import { Grid } from '../../src'
import { Grid as MuiGrid } from '@mui/material'

const gridDemoItemStyle = {
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center' as const,
  backgroundColor: '#f5f5f5',
}

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

export interface ComponentExample {
  label: string;
  description?: string;
  render: () => ReactNode;
}

export interface ComponentMeta {
  name: string;
  description: string;
  muiDefaultRender: () => ReactNode;
  examples: ComponentExample[];
}

export const componentRegistry: ComponentMeta[] = [
  {
    name: "Button",
    description:
      "A versatile button component with loading state, icons, and multiple variants.",
    muiDefaultRender: () => (
      <MuiButton variant="contained">Default MUI Button</MuiButton>
    ),
    examples: [
      {
        label: "Variants",
        description: "Primary, secondary, and ghost",
        render: () => (
          <div className="example-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        ),
      },
      {
        label: "Sizes",
        description: "Small, medium, and large",
        render: () => (
          <div className="example-row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        ),
      },
      {
        label: "With Icons",
        description: "Start and end icon placement",
        render: () => (
          <div className="example-row">
            <Button startIcon={<span>&#8592;</span>}>Back</Button>
            <Button endIcon={<span>&#8594;</span>}>Next</Button>
          </div>
        ),
      },
      {
        label: "Loading State",
        description: "Buttons with loading indicator",
        render: () => (
          <div className="example-row">
            <Button loading loadingText="Saving...">
              Save
            </Button>
            <Button variant="secondary" loading loadingText="Uploading...">
              Upload
            </Button>
          </div>
        ),
      },
      {
        label: "Disabled States",
        render: () => (
          <div className="example-row">
            <Button disabled>Primary</Button>
            <Button variant="secondary" disabled>
              Secondary
            </Button>
            <Button variant="ghost" disabled>
              Ghost
            </Button>
          </div>
        ),
      },
      {
        label: "Full Width",
        render: () => (
          <div style={{ width: 320 }}>
            <Button fullWidth>Full Width Button</Button>
          </div>
        ),
      },
    ],
  },
  {
    name: "Card",
    description:
      "A flexible card container with variant styles, configurable padding, title, and actions.",
    muiDefaultRender: () => (
      <MuiCard>
        <CardContent>Default MUI Card</CardContent>
      </MuiCard>
    ),
    examples: [
      {
        label: "Variants",
        description: "Elevated, outlined, and flat card styles",
        render: () => (
          <div className="example-row">
            <Card title="Elevated" variant="elevated">
              Elevated card with shadow.
            </Card>
            <Card title="Outlined" variant="outlined">
              Outlined card with border.
            </Card>
            <Card title="Flat" variant="flat">
              Flat card without shadow.
            </Card>
          </div>
        ),
      },
      {
        label: "Padding Variants",
        description: "None, small, medium, and large padding",
        render: () => (
          <div className="example-row">
            <Card title="None" padding="none">
              No padding
            </Card>
            <Card title="Small" padding="sm">
              Small padding
            </Card>
            <Card title="Medium" padding="md">
              Medium padding
            </Card>
            <Card title="Large" padding="lg">
              Large padding
            </Card>
          </div>
        ),
      },
      {
        label: "With Actions",
        description: "Card with action buttons in the footer",
        render: () => (
          <Card
            title="Actions Example"
            actions={
              <>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </>
            }
          >
            This card has action buttons in the footer.
          </Card>
        ),
      },
      {
        label: "Without Title",
        render: () => (
          <Card padding="md">
            This card has no title and uses default padding.
          </Card>
        ),
      },
    ],
  },
  {
    name: "Dialog",
    description:
      "A modal dialog with type presets, loading state, and customizable header/actions.",
    muiDefaultRender: () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open MUI Dialog</Button>
          <MuiDialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>MUI Dialog</DialogTitle>
            <MuiDialogContent>Default MUI dialog content.</MuiDialogContent>
            <MuiDialogActions>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </MuiDialogActions>
          </MuiDialog>
        </>
      );
    },
    examples: [
      {
        label: "Type Presets",
        description:
          "Pre-configured dialogs for confirm, delete, error, success, and info",
        render: () => {
          const [type, setType] = useState<DialogType | null>(null);
          const types: { label: string; value: DialogType }[] = [
            { label: "Confirm", value: "confirm" },
            { label: "Delete", value: "delete" },
            { label: "Save", value: "save" },
            { label: "Logout", value: "logout" },
            { label: "Error", value: "error" },
            { label: "Success", value: "success" },
            { label: "Info", value: "info" },
          ];
          return (
            <div className="example-row">
              {types.map((t) => (
                <Button
                  key={t.value}
                  size="sm"
                  onClick={() => setType(t.value)}
                >
                  {t.label}
                </Button>
              ))}
              <Dialog
                open={type !== null}
                type={type ?? undefined}
                onClose={() => setType(null)}
                onConfirm={() => setType(null)}
              >
                <MuiTypography variant="body2">
                  This is a {type} dialog example.
                </MuiTypography>
              </Dialog>
            </div>
          );
        },
      },
      {
        label: "Custom Dialog",
        description:
          "Fully customizable dialog with title, subtitle, and loading state",
        render: () => {
          const [open, setOpen] = useState(false);
          const [loading, setLoading] = useState(false);
          return (
            <>
              <Button onClick={() => setOpen(true)}>Open Custom Dialog</Button>
              <Dialog
                open={open}
                title="Custom Dialog"
                subtitle="This is a customizable subtitle"
                showCloseButton
                onClose={() => {
                  if (!loading) setOpen(false);
                }}
                onConfirm={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setOpen(false);
                  }, 1500);
                }}
                loading={loading}
                loadingText="Saving..."
                confirmText="Save Changes"
                cancelText="Discard"
              >
                <MuiTypography variant="body2">
                  Custom dialog with title, subtitle, close button, and loading
                  state on confirm.
                </MuiTypography>
              </Dialog>
            </>
          );
        },
      },
    ],
  },
  {
    name: "TextField",
    description:
      "A text input field with required indicator, adornments, and error display.",
    muiDefaultRender: () => (
      <MuiTextField label="Default MUI TextField" variant="standard" />
    ),
    examples: [
      {
        label: "Basic Usage",
        render: () => {
          const [val, setVal] = useState("");
          return <TextField label="Full Name" value={val} onChange={setVal} />;
        },
      },
      {
        label: "Required",
        render: () => (
          <TextField required label="Email" value="" onChange={() => {}} />
        ),
      },
      {
        label: "With Error",
        render: () => (
          <TextField
            label="Email"
            value="invalid"
            onChange={() => {}}
            error="Enter a valid email address"
          />
        ),
      },
      {
        label: "With Adornments",
        render: () => (
          <TextField
            label="Price"
            value=""
            onChange={() => {}}
            startAdornment={<span>$</span>}
          />
        ),
      },
    ],
  },
  {
    name: "PhoneField",
    description:
      "A phone number input with country code selector in the start adornment.",
    muiDefaultRender: () => (
      <MuiTextField label="Default MUI Phone" variant="standard" />
    ),
    examples: [
      {
        label: "Basic Usage",
        render: () => {
          const [phone, setPhone] = useState("");
          const [code, setCode] = useState("+1");
          return (
            <PhoneField
              label="Phone number"
              value={phone}
              onChange={setPhone}
              countryCode={code}
              onCountryCodeChange={setCode}
            />
          );
        },
      },
      {
        label: "With Error",
        render: () => {
          const [phone, setPhone] = useState("12");
          return (
            <PhoneField
              label="Phone number"
              value={phone}
              onChange={setPhone}
              countryCode="+91"
              onCountryCodeChange={() => {}}
              error="Phone number must be 10 digits"
            />
          );
        },
      },
      {
        label: "Disabled",
        render: () => (
          <PhoneField
            label="Phone number"
            value="9876543210"
            onChange={() => {}}
            countryCode="+91"
            onCountryCodeChange={() => {}}
            disabled
          />
        ),
      },
    ],
  },
  {
    name: "OTPInput",
    description:
      "A digit-by-digit OTP input with auto-focus, backspace navigation, and paste support.",
    muiDefaultRender: () => (
      <MuiTextField label="Default MUI OTP" variant="standard" />
    ),
    examples: [
      {
        label: "Basic Usage",
        render: () => {
          const [otp, setOtp] = useState("");
          return <OTPInput value={otp} onChange={setOtp} label="Enter OTP" />;
        },
      },
      {
        label: "With Error",
        render: () => (
          <OTPInput
            value="123"
            onChange={() => {}}
            label="Enter OTP"
            error="OTP must be 6 digits"
          />
        ),
      },
      {
        label: "Disabled",
        render: () => (
          <OTPInput
            value="123456"
            onChange={() => {}}
            label="Enter OTP"
            disabled
          />
        ),
      },
    ],
  },
  // Tanziha EmailTextField is a variant of TextField with built-in email validation and normalization.
  {
    name: "Stepper",
    description: "A step progress indicator with clickable step buttons.",
    muiDefaultRender: () => (
      <MuiStepper activeStep={0}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 3</StepLabel>
        </Step>
      </MuiStepper>
    ),
    examples: [
      {
        label: "Active Step",
        render: () => (
          <Stepper steps={["Step 1", "Step 2", "Step 3"]} activeStep={1} />
        ),
      },
      {
        label: "Clickable Steps",
        render: () => {
          const [step, setStep] = useState(0);
          return (
            <Stepper
              steps={["First", "Second", "Third"]}
              activeStep={step}
              onStepClick={setStep}
            />
          );
        },
      },
    ],
  },

  // ======== himanshi button ====================================
  {
    name: "Variant Button",
    description: "Collection of reusable button variants.",
    muiDefaultRender: () => <Button>Default Button</Button>,
    examples: [
      {
        label: "Disabled Button",
        description: "Reusable disabled button variant.",
        render: () => (
          <>
            <VariantButtonDisabled>Log In</VariantButtonDisabled>
          </>
        ),
      },
      {
        label: "Outlined Button",
        description: "Reusable outlined button variant.",
        render: () => (
          <VariantButtonOutlined>Log In with Google</VariantButtonOutlined>
        ),
      },
    ],
  },
  {
    name: "RadioGroup",
    description:
      "A radio group component with customizable options, row/column layout, and multiple sizes.",
    muiDefaultRender: () => (
      <MuiRadioGroupBase row>
        <MuiFormControlLabel
          value="option1"
          control={<MuiRadio />}
          label="Option 1"
        />
        <MuiFormControlLabel
          value="option2"
          control={<MuiRadio />}
          label="Option 2"
        />
        <MuiFormControlLabel
          value="option3"
          control={<MuiRadio />}
          label="Option 3"
        />
      </MuiRadioGroupBase>
    ),
    examples: [
      {
        label: "Basic Usage",
        description: "Simple radio group with horizontal layout",
        render: () => {
          const [selected, setSelected] = useState("email");
          return (
            <RadioGroup
              options={[
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone" },
                { value: "otp", label: "Phone OTP" },
              ]}
              value={selected}
              onChange={setSelected}
              row
            />
          );
        },
      },
      {
        label: "Vertical Layout",
        description: "Radio group with vertical stacking",
        render: () => {
          const [selected, setSelected] = useState("option1");
          return (
            <RadioGroup
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              value={selected}
              onChange={setSelected}
              row={false}
            />
          );
        },
      },
      {
        label: "Small Size",
        description: "Radio group with small radio buttons",
        render: () => {
          const [selected, setSelected] = useState("small1");
          return (
            <RadioGroup
              options={[
                { value: "small1", label: "Small Option 1" },
                { value: "small2", label: "Small Option 2" },
              ]}
              value={selected}
              onChange={setSelected}
              size="small"
              row
            />
          );
        },
      },
      {
        label: "With Disabled Options",
        description: "Radio group with disabled state",
        render: () => {
          const [selected, setSelected] = useState("active1");
          return (
            <RadioGroup
              options={[
                { value: "active1", label: "Active 1" },
                {
                  value: "disabled1",
                  label: "Disabled Option",
                  disabled: true,
                },
                { value: "active2", label: "Active 2" },
              ]}
              value={selected}
              onChange={setSelected}
              row
            />
          );
        },
      },
      {
        label: "Disabled Group",
        description: "Entire radio group disabled",
        render: () => (
          <RadioGroup
            options={[
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2" },
              { value: "opt3", label: "Option 3" },
            ]}
            value="opt1"
            onChange={() => {}}
            disabled
            row
          />
        ),
      },
      {
        label: "Different Colors",
        description: "Radio group with secondary color",
        render: () => {
          const [selected, setSelected] = useState("color1");
          return (
            <RadioGroup
              options={[
                { value: "color1", label: "Primary" },
                { value: "color2", label: "Secondary" },
              ]}
              value={selected}
              onChange={setSelected}
              color="secondary"
              row
            />
          );
        },
      },
    ],
  },
  {
    name: "Typography",
    description:
      "A flexible typography component with multiple variants, colors, and support for nested content.",
    muiDefaultRender: () => (
      <MuiTypography variant="body1">Default MUI Typography</MuiTypography>
    ),
    examples: [
      {
        label: "Body Text",
        description: "Basic body text with primary color",
        render: () => <Typography variant="body1">Log in with</Typography>,
      },
      {
        label: "Body2 with Link",
        description: "Smaller body text with secondary color and link support",
        render: () => (
          <Typography variant="body2" color="secondary">
            <MuiLink href="/forgot-password" color="inherit">
              Forgot Password ?
            </MuiLink>
          </Typography>
        ),
      },
      {
        label: "Heading h5",
        description: "Heading with nested typography and mixed colors",
        render: () => (
          <Typography variant="h5" gutterBottom color="primary">
            <strong>Log in to </strong>
            <Typography variant="h5" color="secondary" component="span">
              <strong> My Organization</strong>
            </Typography>
          </Typography>
        ),
      },
      {
        label: "All Variants",
        description: "Display all typography variants",
        render: () => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Typography variant="h1" color="primary">
              H1 Heading
            </Typography>
            <Typography variant="h2" color="primary">
              H2 Heading
            </Typography>
            <Typography variant="h3" color="primary">
              H3 Heading
            </Typography>
            <Typography variant="h4" color="primary">
              H4 Heading
            </Typography>
            <Typography variant="h5" color="primary">
              H5 Heading
            </Typography>
            <Typography variant="h6" color="primary">
              H6 Heading
            </Typography>
          </div>
        ),
      },
      {
        label: "Different Colors",
        description: "Typography with various color options",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="body1" color="primary">
              Primary Color
            </Typography>
            <Typography variant="body1" color="secondary">
              Secondary Color
            </Typography>
            <Typography variant="body1" color="success">
              Success Color
            </Typography>
            <Typography variant="body1" color="error">
              Error Color
            </Typography>
            <Typography variant="body1" color="info">
              Info Color
            </Typography>
            <Typography variant="body1" color="warning">
              Warning Color
            </Typography>
          </div>
        ),
      },
      {
        label: "Font Weights",
        description: "Typography with different font weights",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="body1" fontWeight="light">
              Light Font Weight
            </Typography>
            <Typography variant="body1" fontWeight="regular">
              Regular Font Weight
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              Medium Font Weight
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Bold Font Weight
            </Typography>
          </div>
        ),
      },
      {
        label: "Text Alignment",
        description: "Typography with different alignments",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="body1" align="left">
              Left Aligned
            </Typography>
            <Typography variant="body1" align="center">
              Center Aligned
            </Typography>
            <Typography variant="body1" align="right">
              Right Aligned
            </Typography>
            <Typography variant="body1" align="justify">
              Justified Text - Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Typography>
          </div>
        ),
      },
      {
        label: "With Gutters",
        description: "Typography with bottom margin",
        render: () => (
          <div>
            <Typography variant="h5" gutterBottom color="primary">
              Heading with Gutter
            </Typography>
            <Typography variant="body1" color="secondary">
              This body text appears below with proper spacing.
            </Typography>
          </div>
        ),
      },
    ],
  },
   {
    name: 'Divider',
    description: 'A horizontal or vertical divider used to separate content.',

    muiDefaultRender: () => (
      <div style={{ width: 320 }}>
        <MuiDivider />
      </div>
    ),

    examples: [
      {
        label: 'Horizontal Divider',
        description: 'Default horizontal divider.',
        render: () => (
          <Divider />
        ),
      },

      {
      label: 'Divider with Text',
      description: 'Horizontal divider with centered text.',
      render: () => (
        <Divider>OR</Divider>
      ),
    },

    {
      label: 'Left Aligned Text',
      description: 'Divider with left aligned text.',
      render: () => (
        <Divider textAlign="left">
          OR
        </Divider>
      ),
    },

    {
      label: 'Right Aligned Text',
      description: 'Divider with right aligned text.',
      render: () => (
        <Divider textAlign="right">
          OR
        </Divider>
      ),
    },

    {
      label: 'Inset Divider',
      description: 'Inset divider.',
      render: () => (
        <Divider variant="inset" />
      ),
    },

    {
      label: 'Middle Divider',
      description: 'Middle divider.',
      render: () => (
        <Divider variant="middle" />
      ),
    },

    {
      label: 'Vertical Divider',
      description: 'Vertical divider.',
      render: () => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            height: 60,
          }}
        >
          <span>Left</span>

          <Divider
            orientation="vertical"
            flexItem
          />

          <span>Right</span>
        </div>
      ),
    },
    ],
  },
  {
    name: 'Box',
    description: 'A wrapper component for the Material UI Box.',

    muiDefaultRender: () => (
      <MuiBox
        sx={{
          p: 2,
          border: '1px solid #d1d5db',
          borderRadius: 1,
        }}
      >
        Default Box
      </MuiBox>
    ),

    examples: [
      {
        label: 'Padding',
        description: 'Apply padding using the Box component.',

        render: () => (
          <Box
            sx={{
              p: 3,
              border: '1px solid #d1d5db',
              borderRadius: 1,
            }}
          >
            Box with Padding
          </Box>
        ),
      },
      {
        label: 'Border',
        description: 'Apply a border using the Box component.',

        render: () => (
          <Box
            sx={{
              p: 3,
              border: '2px solid #1976d2',
              borderRadius: 1,
            }}
          >
            Box with Border
          </Box>
        ),
      },
      {
        label: 'Background Color',
        description: 'Apply a background color using the Box component.',

        render: () => (
          <Box
            sx={{
              p: 3,
              bgcolor: '#1976d2',
              color: '#fff',
              borderRadius: 1,
            }}
          >
            Box with Background Color
          </Box>
        ),
      },

      {
        label: 'Border Radius',
        description: 'Apply rounded corners using the Box component.',

        render: () => (
          <Box
            sx={{
              p: 3,
              border: '1px solid #d1d5db',
              borderRadius: 3,
              bgcolor: '#f5f5f5',
            }}
          >
            Box with Border Radius
          </Box>
        ),
      },

      {
        label: 'Box Shadow',
        description: 'Apply elevation using the Box component.',

        render: () => (
          <Box
            sx={{
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: '#fff',
            }}
          >
            Box with Shadow
          </Box>
        ),
      },

      {
        label: 'Display',
        description: 'Control the display property of the Box component.',

        render: () => (
          <Box
            sx={{
              display: 'inline-block',
              p: 3,
              bgcolor: '#1976d2',
              color: '#fff',
              borderRadius: 2,
            }}
          >
            Inline Block Box
          </Box>
        ),
      },
      {
        label: 'Flexbox',
        description: 'Use the Box component as a flex container.',

        render: () => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              p: 2,
              border: '1px solid #d1d5db',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: '#1976d2',
                color: '#fff',
                borderRadius: 1,
              }}
            >
              Item 1
            </Box>

            <Box
              sx={{
                p: 2,
                bgcolor: '#2e7d32',
                color: '#fff',
                borderRadius: 1,
              }}
            >
              Item 2
            </Box>

            <Box
              sx={{
                p: 2,
                bgcolor: '#ed6c02',
                color: '#fff',
                borderRadius: 1,
              }}
            >
              Item 3
            </Box>
          </Box>
        ),
      },
      {
      label: 'Position',
      description: 'Position elements using the Box component.',

      render: () => (
        <Box
          sx={{
            position: 'relative',
            width: 300,
            height: 150,
            border: '1px solid #d1d5db',
            borderRadius: 2,
            bgcolor: '#f5f5f5',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              p: 1,
              bgcolor: '#1976d2',
              color: '#fff',
              borderRadius: 1,
            }}
          >
            Positioned Box
          </Box>
        </Box>
      ),
    },
    {
      label: 'Responsive Box',
      description: 'Apply responsive styles using the Box component.',

      render: () => (
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            width: {
              xs: '100%',
              sm: '75%',
              md: '50%',
            },
            bgcolor: {
              xs: '#1976d2',
              sm: '#2e7d32',
              md: '#ed6c02',
            },
            color: '#fff',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          Responsive Box
        </Box>
      ),
    },
  ],
  },

{
  name: 'Grid',
  description: 'A responsive layout component based on Material UI Grid.',

  muiDefaultRender: () => (
    <MuiGrid container spacing={2}>
      <MuiGrid size={8}>
        <div style={gridDemoItemStyle}>size=8</div>
      </MuiGrid>

      <MuiGrid size={4}>
        <div style={gridDemoItemStyle}>size=4</div>
      </MuiGrid>

      <MuiGrid size={4}>
        <div style={gridDemoItemStyle}>size=4</div>
      </MuiGrid>

      <MuiGrid size={8}>
        <div style={gridDemoItemStyle}>size=8</div>
      </MuiGrid>
    </MuiGrid>
  ),

  examples: [
    {
      label: 'Multiple Breakpoints',
      description: 'Responsive layout using different breakpoints.',

      render: () => (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            <div style={gridDemoItemStyle}>
              xs=12 sm=6 md=8
            </div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <div style={gridDemoItemStyle}>
              xs=12 sm=6 md=4
            </div>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <div style={gridDemoItemStyle}>
              xs=6 md=4
            </div>
          </Grid>

          <Grid size={{ xs: 6, md: 8 }}>
            <div style={gridDemoItemStyle}>
              xs=6 md=8
            </div>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Spacing',
      description: 'Control spacing between grid items using the spacing prop.',

      render: () => (
        <Grid container spacing={4}>
          <Grid size={3}>
            <div style={gridDemoItemStyle}>Item 1</div>
          </Grid>

          <Grid size={3}>
            <div style={gridDemoItemStyle}>Item 2</div>
          </Grid>

          <Grid size={3}>
            <div style={gridDemoItemStyle}>Item 3</div>
          </Grid>

          <Grid size={3}>
            <div style={gridDemoItemStyle}>Item 4</div>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Row & Column Spacing',
      description: 'Control row and column spacing independently.',

      render: () => (
        <Grid
          container
          rowSpacing={4}
          columnSpacing={2}
        >
          <Grid size={6}>
            <div style={gridDemoItemStyle}>Item 1</div>
          </Grid>

          <Grid size={6}>
            <div style={gridDemoItemStyle}>Item 2</div>
          </Grid>

          <Grid size={6}>
            <div style={gridDemoItemStyle}>Item 3</div>
          </Grid>

          <Grid size={6}>
            <div style={gridDemoItemStyle}>Item 4</div>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Responsive Values',
      description: 'Responsive spacing and item sizes based on screen size.',

      render: () => (
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <div style={gridDemoItemStyle}>
              xs=12 sm=6 md=3
            </div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <div style={gridDemoItemStyle}>
              xs=12 sm=6 md=3
            </div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <div style={gridDemoItemStyle}>
              xs=12 sm=6 md=3
            </div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <div style={gridDemoItemStyle}>
              xs=12 sm=6 md=3
            </div>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Auto Layout',
      description: 'Grid items automatically share the available space.',

      render: () => (
        <Grid container spacing={2}>
          <Grid size="grow">
            <div style={gridDemoItemStyle}>Item 1</div>
          </Grid>

          <Grid size="grow">
            <div style={gridDemoItemStyle}>Item 2</div>
          </Grid>

          <Grid size="grow">
            <div style={gridDemoItemStyle}>Item 3</div>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Variable Width Content',
      description: 'Grid items with automatic and fixed widths.',

      render: () => (
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
          <Grid size="grow">
            <div style={gridDemoItemStyle}>
              grow
            </div>
          </Grid>

          <Grid size="auto">
            <div style={gridDemoItemStyle}>
              Auto Width
            </div>
          </Grid>

          <Grid size="grow">
            <div style={gridDemoItemStyle}>
              grow
            </div>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Nested Grid',
      description: 'Grid container nested inside another grid.',

      render: () => (
        <Grid container spacing={2}>
          <Grid size={6}>
            <div style={gridDemoItemStyle}>Parent Item 1</div>
          </Grid>

          <Grid size={6}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <div style={gridDemoItemStyle}>Child 1</div>
              </Grid>

              <Grid size={6}>
                <div style={gridDemoItemStyle}>Child 2</div>
              </Grid>

              <Grid size={12}>
                <div style={gridDemoItemStyle}>Child 3</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Columns',
      description: 'Customize the total number of columns in the grid.',

      render: () => (
        <Grid
          container
          columns={16}
          spacing={2}
        >
          <Grid size={8}>
            <div style={gridDemoItemStyle}>
              size=8
            </div>
          </Grid>

          <Grid size={8}>
            <div style={gridDemoItemStyle}>
              size=8
            </div>
          </Grid>

          <Grid size={4}>
            <div style={gridDemoItemStyle}>
              size=4
            </div>
          </Grid>

          <Grid size={12}>
            <div style={gridDemoItemStyle}>
              size=12
            </div>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Offset',
      description: 'Offset grid items to create empty space before an item.',

      render: () => (
        <Grid
          container
          spacing={2}
        >
          <Grid
            size={4}
            offset={2}
          >
            <div style={gridDemoItemStyle}>
              size=4 offset=2
            </div>
          </Grid>

          <Grid
            size={4}
            offset={2}
          >
            <div style={gridDemoItemStyle}>
              size=4 offset=2
            </div>
          </Grid>
        </Grid>
      ),
    },
  ],
},
  ]

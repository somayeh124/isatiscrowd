import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ContractsAccordion() {
  const contracts = [
    { id: 1, title: 'قرارداد شماره 1', content: 'این متن مربوط به قرارداد شماره 1 است.' },
    { id: 2, title: 'قرارداد شماره 2', content: 'این متن مربوط به قرارداد شماره 2 است.' },
    { id: 3, title: 'قرارداد شماره 3', content: 'این متن مربوط به قرارداد شماره 3 است.' },
    { id: 4, title: 'قرارداد شماره 4', content: 'این متن مربوط به قرارداد شماره 4 است.' },
  ];

  const [checkedContracts, setCheckedContracts] = React.useState(() => {
    const savedState = localStorage.getItem('checkedContracts');
    return savedState ? JSON.parse(savedState) : {};
  });

  const [expandedPanels, setExpandedPanels] = React.useState({});

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpandedPanels({
      ...expandedPanels,
      [panel]: isExpanded,
    });
  };

  const handleCheckboxChange = (id) => (event) => {
    const isChecked = event.target.checked;
    const newCheckedContracts = {
      ...checkedContracts,
      [id]: isChecked,
    };
    setCheckedContracts(newCheckedContracts);
    localStorage.setItem('checkedContracts', JSON.stringify(newCheckedContracts));

    // Automatically close the accordion if checkbox is checked
    if (isChecked) {
      setExpandedPanels({
        ...expandedPanels,
        [`panel${id}`]: false,
      });
    }
  };

  return (
    <div dir="rtl" style={{ marginTop: '40px', maxWidth: '600px', margin: 'auto' }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: '24px', textAlign: 'center', fontWeight: 'bold' }}
      >
        قراردادها
      </Typography>
      {contracts.map((contract) => (
        <Accordion
          key={contract.id}
          expanded={expandedPanels[`panel${contract.id}`] || false}
          onChange={handleExpansion(`panel${contract.id}`)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: 'none',
            marginBottom: '6px',
            border: checkedContracts[contract.id] ? '1px solid #90CAF9' : '1px solid #ddd',
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#333' }} />}
            aria-controls={`panel${contract.id}-content`}
            id={`panel${contract.id}-header`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
            }}
          >
            <Typography sx={{ flexGrow: 1, color: '#333', fontWeight: 'bold' }}>
              {contract.title}
            </Typography>
            {checkedContracts[contract.id] && <CheckCircleIcon sx={{ color: '#1976d2' }} />}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0 16px 16px 16px' }}>
            <Typography sx={{ color: '#555' }}>{contract.content}</Typography>
            <FormControlLabel
              dir="ltr"
              control={
                <Checkbox
                  sx={{ flex: 'flex', justifyContent: 'end', alignContent: 'end' }}
                  checked={checkedContracts[contract.id] || false}
                  onChange={handleCheckboxChange(contract.id)}
                />
              }
              label="مطالعه نمودم"
              sx={{
                marginTop: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

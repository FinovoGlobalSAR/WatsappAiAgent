import React, { useMemo, useState } from 'react';
import { CarFront, Check, ChevronDown, Eye, FileText, Globe2, Image as ImageIcon, Settings, Tag } from 'lucide-react';
import SharedSidebar from '../components/layout/SharedSidebar';
import Topbar from '../components/layout/Topbar';
import SectionCard from '../components/common/SectionCard';
import Field from '../components/common/Field';
import Counter from '../components/common/Counter';
import Segment from '../components/common/Segment';
import SelectField from '../components/common/SelectField';
import TextField from '../components/common/TextField';
import { inputCls } from '../components/common/inputStyles';
import { BRANDS, CATEGORIES, COLORS, YEARS } from '../data/carOptions';

export default function AddCarPage() {
  const [mobile, setMobile] = useState(false);

  const [form, setForm] = useState({ brand: '', model: '', registration: '', category: '', year: '2026', transmission: 'Automatic', seats: 5, doors: 4, color: '', mileage: '', fuel: 'Petrol', periods: ['Daily', 'Weekly', 'Monthly'], daily: '', weekly: '', monthly: '', status: 'Available', public: true, notes: '' });

  const [photo, setPhoto] = useState(null);

  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggle = p => setForm(f => ({ ...f, periods: f.periods.includes(p) ? f.periods.filter(x => x !== p) : [...f.periods, p] }));

  const count = (k, d) => setForm(f => ({ ...f, [k]: Math.max(1, f[k] + d) }));

  const onFile = file => {
    if (!file) return; if (file.size > 10 * 1024 * 1024) return alert('Photo must be 10MB or smaller.'); if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type))
      return alert('Please choose a PNG, JPG or WEBP image.'); setPhoto(URL.createObjectURL(file))
  };

  const title = useMemo(() => [form.brand, form.model].filter(Boolean).join(' ') || 'Your car', [form.brand, form.model]);

  const save = e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500) };

  return <div className="min-h-screen bg-white font-sans text-[#29243b]">

    <SharedSidebar mobileNav={mobile} setMobileNav={setMobile} />

    <div className="lg:ml-[224px]">

      <Topbar kind="add" onMenu={() => setMobile(true)} />

      <main className="mx-auto w-[calc(100%-44px)] max-w-[900px] py-7 pb-9">

        <div className="mb-[18px] ml-[30px] flex items-start justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] text-[#827d9c]"><span>Cars</span>
              <ChevronDown size={13} className="-rotate-90" />
              <b className="text-[#41394d]">Add a car</b>
            </div>
            <h1 className="mb-[5px] text-[25px] font-bold leading-[1.2] tracking-[-.5px]">Add a Car</h1>
            <p className="m-0 text-[11px] text-[#8d87a3]">Add a new vehicle to your fleet. Fill in the detail below to get started.</p>
          </div>
          <div className="mt-[27px] flex gap-3">
            <button  type="button" onClick={() => window.location.reload()} className="flex h-9 items-center gap-1.5 rounded-[7px] border border-[#dedce4] bg-white px-[19px] text-[11px] font-semibold">Cancel</button>

            <button type="submit" form="car-form" className="flex h-9 items-center gap-1.5 rounded-[7px] border border-[#ffbd22] bg-[#ffbd22] px-[21px] text-[11px] font-semibold text-[#1e1a18]">

              <Check size={17} />Save car</button>

          </div>
        </div>
        <form id="car-form" onSubmit={save} className="grid grid-cols-[1.45fr_.7fr] gap-x-[18px] gap-y-3 rounded-[12px] bg-white p-[16px_17px_17px] shadow-[0_3px_8px_rgba(0,0,0,.125)] max-md:grid-cols-1">
          <div className="flex min-w-0 flex-col gap-3">
            <SectionCard icon={
              <FileText size={19} />} title="Identification" subtitle="Basic information about the vehicle">
              <div className="grid grid-cols-2 gap-x-[17px] gap-y-[11px]">

                <SelectField label="Brand" value={form.brand} placeholder="Select brand" options={BRANDS} onChange={v => set('brand', v)} />

                <SelectField label="Category" value={form.category} placeholder="Select category" options={CATEGORIES} onChange={v => set('category', v)} />

                <TextField label="Model" value={form.model} placeholder="e.g. Corolla" max="100" onChange={v => set('model', v)} />

                <SelectField label="Year" value={form.year} options={YEARS} onChange={v => set('year', v)} />

                <TextField label="Registration Number" value={form.registration} placeholder="e.g. ABC-1234" max="50" onChange={v => set('registration', v)} />

              </div>
            </SectionCard>

            <SectionCard icon={

              <Settings size={19} />}
              title="Specifications"
              subtitle="Technical details and features">

              <div className="grid grid-cols-2 gap-x-[17px] gap-y-[11px] transition-all duration-300 ease-in-out">
                <Field label="Transmission" >

                  <Segment items={['Automatic', 'Manual']} value={form.transmission} onChange={v => set('transmission', v)} />

                </Field>
                <Field label="Fuel type">

                  <div className="flex h-[35px] gap-[6px]">{['Petrol', 'Diesel', 'Hybrid', 'Electric'].map(v =>

                    <button type="button" key={v} onClick={() => set('fuel', v)} className={`rounded-[17px] border px-[10px] text-[9px] ${form.fuel === v ? 'border-[1.5px] border-[#5b0a58] bg-[#f8f2f9] text-[#4d0750]' : 'border-[#dfdde4] bg-[#f0f0f1] text-[#7b748e]'}`}>{v}
                    </button>)}
                  </div>
                </Field>

                <Counter label="Seats" value={form.seats} onChange={d => count('seats', d)} />
                <Counter label="Doors" value={form.doors} onChange={d => count('doors', d)} />
                <Field label="Color" required={false}>
                  <div className="flex gap-2">
                    <span className="h-[35px] w-[34px] rounded-[7px] border border-[#dddbe2] bg-white" />
                    <div className="relative flex-1">
                      <select className={`${inputCls} appearance-none pr-8`} value={form.color} onChange={e => set('color', e.target.value)}>
                        <option value="">Select color</option>{COLORS.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={17} className="pointer-events-none absolute right-[10px] top-[9px] text-[#6d6577]" />
                    </div>
                  </div>
                </Field>
                <TextField label="Mileage" value={form.mileage} max="50" placeholder="e.g. 15000" onChange={v => set('mileage', v)} />
              </div>
            </SectionCard>

            <SectionCard icon={
              <Tag size={19} />} title="Pricing & availability" subtitle="Set the rental rate and availability status.">
              <div className="text-[10px] font-semibold">Available For</div>
              <p className="-mt-px mb-3 text-[8px] text-[#8c869c]">Select the rental periods this vehicle can be booked for
              </p>
              <div
                className="mb-3 flex gap-4">{['Daily', 'Weekly', 'Monthly'].map(p =>
                  <button
                    type="button"
                    key={p}
                    onClick={() => toggle(p)}
                    className={`flex h-9 items-center gap-[5px] rounded-[8px] bg-[#3f003d] px-[14px] text-[10px] text-white ${form.periods.includes(p) ? '' : 'opacity-75'}`}>
                    {form.periods.includes(p) &&
                      <Check size={15} />} {p}
                  </button>)}
              </div>


              <div className="grid grid-cols-3 gap-3">{[['Daily Rate ($)', 'daily', '/ day'], ['Weekly Rate', 'weekly', '/ Week'], ['Monthly Rate', 'monthly', '/ Month']].map(([l, k, s]) =>
                <Field key={k} label={l}>
                  <div className="flex h-[35px] items-center gap-2 rounded-[9px] border border-[#dcdbe1] bg-[#f1f1f2] px-[10px]">
                    <b className="text-[10px] text-[#25212c]">$
                    </b>
                    <input className="h-[30px] min-w-0 flex-1 border-0 bg-transparent p-0 text-[10px] text-[#77708d] outline-none" value={form[k]} onChange={e => set(k, e.target.value)} placeholder="0.00" />
                    <b className="ml-auto whitespace-nowrap text-[8px] font-medium text-[#888195]"
                    >{s}</b>
                  </div>
                </Field>)}


              </div>
              <div className="mb-[5px] mt-[11px] text-[9px] font-semibold">Status</div>
              <div className="grid grid-cols-3 gap-[11px]">{[['Available', 'Ready for rent', 'green'], ['Rented', 'Currently rented', 'blue'], ['Maintenance', 'Under service', 'gold']].map(([n, d, t]) =>
                <button type="button" key={n} onClick={() => set('status', n)} className={`flex h-[53px] items-start gap-[7px] rounded-[9px] border bg-[#f0f0f1] px-[9px] py-2 text-left ${form.status === n && t === 'green' ? 'border-[1.5px] border-[#377f64] bg-[#edf8f2]' : ''}`}>
                  <span className={`mt-px h-[11px] w-[11px] shrink-0 rounded-full ${t === 'green' ? 'bg-[#319a70]' : t === 'blue' ? 'bg-[#2864cf]' : 'bg-[#b27c09]'} shadow-[inset_0_0_0_3px_#fff]`} />
                  <span>
                    <b className="mb-[5px] block text-[9px]">{n}</b>
                    <small className="block text-[8px] text-[#827c92]">{d}
                    </small>
                  </span>
                </button>
              )}
              </div>

            </SectionCard>
            <SectionCard icon={
              <span className="text-[18px]">≡</span>}
              title="Description" subtitle="Add notes and additional information about this vehicle">
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Condition, history, standout features…" className="block h-[55px] w-full resize-y rounded-[9px] border border-[#dcdbe1] bg-[#f1f1f2] p-[9px_10px] text-[10px] outline-none" />

            </SectionCard>


          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <SectionCard icon={
              <ImageIcon size={19} />} title="Photo" subtitle="Add a high-quality photo of the vehicle"><label onDragOver={e => e.preventDefault()} onDrop={e => {
                e.preventDefault();
                onFile(e.dataTransfer.files?.[0])
              }} className="relative flex h-[194px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[8px] border-[1.5px] border-dashed border-[#7d267c] bg-[#f6f0f7]">{photo ?
                <img src={photo} alt="Vehicle preview" className="h-full w-full object-cover" /> : <><ImageIcon size={45} className="text-[#7d267c]" />
                  <strong className="mt-2 text-[10px]">Drag a photo here or
                    <span className="text-[#7d267c]">browse</span>
                  </strong>
                  <small className="mt-1 text-[8px] text-[#928ba8]">PNG, JPG or WEBP (max 10MB)</small>
                  <span className="mt-3 rounded-[6px] border border-[#d7c6da] bg-white px-3 py-2 text-[9px] font-semibold">Choose file</span>
                </>}
                <input className="hidden" type="file" accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp" onChange={e => onFile(e.target.files?.[0])} />
              </label>
            </SectionCard>


            <SectionCard icon={
              <Eye size={19}
              />}
              title="Live preview" subtitle="This is how the car will appear in the catalog.">
              <div
                className={`relative flex h-[194px] flex-col items-center justify-center overflow-hidden rounded-[8px] bg-[#eeeef0] text-center ${photo ? '' : 'text-[#827b9c]'}`}>
                {photo ? <>
                  <img src={photo} alt={title} className="h-full w-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/55 p-2 text-left text-[11px] font-semibold text-white">{title}
                  </div>
                </> : <>
                  <CarFront size={72} />
                  <b className="mt-3 text-[11px]">Your car preview will appear here</b>
                  <span className="mt-1 text-[8px]">Fill in vehicle details and upload a photo<br />to see a live preview
                  </span>
                </>}

              </div>

            </SectionCard>
            <div className="flex items-center gap-3 rounded-[10px] border border-[#e2e0e7] bg-white p-4">
              <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#f3edf5] text-[#4b0750]">
                <Globe2 size={21} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <b className="text-[10px]">Show in public catalog</b>
                <span className="text-[8px] text-[#928ba8]">When enabled, this car will be visible to customers.</span>
              </div>
              <button type="button" aria-label="Toggle public catalog" onClick={() => set('public', !form.public)} className={`relative h-[30px] w-[50px] rounded-full p-[3px] ${form.public ? 'bg-[#3f003d]' : 'bg-[#ddd]'}`}>
                <span className={`block h-6 w-6 rounded-full bg-white transition-transform ${form.public ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </div>

        </form>
        {saved &&
          <div className="fixed bottom-5 right-5 flex items-center gap-2 rounded-lg bg-[#3f003d] px-4 py-3 text-[12px] text-white shadow-lg">
            <Check size={17} />Car saved successfully</div>}
      </main>
    </div>
  </div>;
}

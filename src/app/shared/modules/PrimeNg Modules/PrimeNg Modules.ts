import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { KnobModule } from 'primeng/knob';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TreeSelectModule } from 'primeng/treeselect';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
// Button Modules
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
// Data Modules
import { TableModule } from 'primeng/table';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ScrollerModule } from 'primeng/scroller';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { TimelineModule } from 'primeng/timeline';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
//  Panel Modules
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
// Overlay Modules
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
// File Modules
import { FileUploadModule } from 'primeng/fileupload';
// Menu Modules
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DockModule } from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
// Chart Modules
import { ChartModule } from 'primeng/chart';
// Messages Modules
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
// Media Modules
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
// Drag & Drop Module
import { DragDropModule } from 'primeng/dragdrop';
//  Misc Modules
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { ChipModule } from 'primeng/chip';
import { InplaceModule } from 'primeng/inplace';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
// Directives Modules
import { DeferModule } from 'primeng/defer';
import { FocusTrapModule } from 'primeng/focustrap';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { AutoFocusModule } from 'primeng/autofocus';
import { AnimateModule } from 'primeng/animate';
import { OverlayModule } from 'primeng/overlay';
import { FilterService } from 'primeng/api';

@NgModule({
    imports: [
        AutoCompleteModule,
CalendarModule,
CascadeSelectModule,
ChipsModule,
ColorPickerModule,
DropdownModule,
EditorModule,
InputTextModule,
CheckboxModule,
RadioButtonModule,
InputMaskModule,
InputSwitchModule,
InputTextareaModule,
InputNumberModule,
KnobModule,
KeyFilterModule,
ListboxModule,
MultiSelectModule,
PasswordModule,
RatingModule,
SelectButtonModule,
SliderModule,
TreeSelectModule,
TriStateCheckboxModule,
ToggleButtonModule,
ButtonModule,
SplitButtonModule,
SpeedDialModule,
TableModule,
DataViewModule,
// DataViewLayoutOptions,
ScrollerModule,
OrderListModule,
OrganizationChartModule,
PaginatorModule,
PickListModule,
TreeModule,
TreeTableModule,
TimelineModule,
VirtualScrollerModule,
AccordionModule,
CardModule,
DividerModule,
FieldsetModule,
PanelModule,
SplitterModule,
ScrollPanelModule,
TabViewModule,
ToolbarModule,
ConfirmDialogModule,
ConfirmPopupModule,
DialogModule,
DynamicDialogModule,
OverlayPanelModule,
SidebarModule,
TooltipModule,
FileUploadModule,
BreadcrumbModule,
ContextMenuModule,
DockModule,
MenuModule,
MenubarModule,
MegaMenuModule,
PanelMenuModule,
SlideMenuModule,
StepsModule,
TabMenuModule,
TieredMenuModule,
ChartModule,
MessagesModule,
ToastModule,
CarouselModule,
GalleriaModule,
ImageModule,
DragDropModule,
AvatarModule,
BadgeModule,
BlockUIModule,
ChipModule,
InplaceModule,
ScrollTopModule,
SkeletonModule,
ProgressBarModule,
ProgressSpinnerModule,
TagModule,
TerminalModule,
DeferModule,
FocusTrapModule,
StyleClassModule,
RippleModule,
AutoFocusModule,
AnimateModule,
OverlayModule,
// FilterService

    ],
    exports: [
        AutoCompleteModule,
CalendarModule,
CascadeSelectModule,
ChipsModule,
ColorPickerModule,
DropdownModule,
EditorModule,
InputTextModule,
CheckboxModule,
RadioButtonModule,
InputMaskModule,
InputSwitchModule,
InputTextareaModule,
InputNumberModule,
KnobModule,
KeyFilterModule,
ListboxModule,
MultiSelectModule,
PasswordModule,
RatingModule,
SelectButtonModule,
SliderModule,
TreeSelectModule,
TriStateCheckboxModule,
ToggleButtonModule,
ButtonModule,
SplitButtonModule,
SpeedDialModule,
TableModule,
DataViewModule,
DataViewLayoutOptions,
ScrollerModule,
OrderListModule,
OrganizationChartModule,
PaginatorModule,
PickListModule,
TreeModule,
TreeTableModule,
TimelineModule,
VirtualScrollerModule,
AccordionModule,
CardModule,
DividerModule,
FieldsetModule,
PanelModule,
SplitterModule,
ScrollPanelModule,
TabViewModule,
ToolbarModule,
ConfirmDialogModule,
ConfirmPopupModule,
DialogModule,
DynamicDialogModule,
OverlayPanelModule,
SidebarModule,
TooltipModule,
FileUploadModule,
BreadcrumbModule,
ContextMenuModule,
DockModule,
MenuModule,
MenubarModule,
MegaMenuModule,
PanelMenuModule,
SlideMenuModule,
StepsModule,
TabMenuModule,
TieredMenuModule,
ChartModule,
MessagesModule,
ToastModule,
CarouselModule,
GalleriaModule,
ImageModule,
DragDropModule,
AvatarModule,
BadgeModule,
BlockUIModule,
ChipModule,
InplaceModule,
ScrollTopModule,
SkeletonModule,
ProgressBarModule,
ProgressSpinnerModule,
TagModule,
TerminalModule,
DeferModule,
FocusTrapModule,
StyleClassModule,
RippleModule,
AutoFocusModule,
AnimateModule,
OverlayModule,
// FilterService
    ]
})

export class PrimeNgModules { }
